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
import { Eye, PlusCircle } from 'lucide-react'
import { useEffect } from 'react'

export function Game() {
  const {
    games,
    handlers: { handleListGames },
  } = useListGames()

  useEffect(() => {
    handleListGames({ params: {} })
  }, [handleListGames])

  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="w-full">
        <PlusCircle />
        Cadastrar Jogo
      </Button>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>Ranking de Vencedores por jogo.</TableCaption>
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
                    <TableCell>{type}</TableCell>
                    <TableCell>{minPlayers}</TableCell>
                    <TableCell>{maxPlayers}</TableCell>
                    <TableCell>
                      <Button size="icon">
                        <Eye />
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
