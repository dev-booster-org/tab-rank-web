import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Eye, Pen, PlusCircle } from 'lucide-react'

import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'

import { useListGames } from '@/modules/game/hooks/use-list-games'
import { gameTypeTranslations } from '@/modules/game/utils/game-type-translations'

export function Game() {
  const navigate = useNavigate()
  const {
    games,
    handlers: { handleListGames },
  } = useListGames()

  useEffect(() => {
    handleListGames({ params: {} })
  }, [handleListGames])

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => {
          navigate('/auth/create-game')
        }}
        variant="outline"
        className="w-full"
      >
        <PlusCircle />
        Cadastrar Jogo
      </Button>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>Jogos disponíveis</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Min</TableHead>
                <TableHead>Max</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map(({ id, name, type, minPlayers, maxPlayers }) => {
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{gameTypeTranslations[type[0]]}</TableCell>
                    <TableCell>{minPlayers}</TableCell>
                    <TableCell>{maxPlayers}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button size="icon">
                        <Eye />
                      </Button>
                      <Button size="icon">
                        <Pen />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
