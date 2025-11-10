import { Crown, Gamepad, PlusCircle, Waypoints } from 'lucide-react'
import { useNavigate } from 'react-router'

import { useListGameRank } from '@/modules/game/hooks/use-list-game-rank'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import { useEffect } from 'react'

export function Home() {
  const navigate = useNavigate()
  const {
    gameRank,
    handlers: { handleListGameRank },
  } = useListGameRank()

  useEffect(() => {
    handleListGameRank({ params: undefined })
  }, [handleListGameRank])

  return (
    <div className="flex flex-col gap-4 w-full">
      <section className="flex gap-4">
        <Card
          onClick={() => {
            navigate('/auth/create-lobby')
          }}
          className="flex-1 cursor-pointer"
        >
          <CardHeader className="flex flex-col gap-4 items-center text-center">
            <PlusCircle className="h-6 w-6" />
            <CardTitle>Criar lobby</CardTitle>
          </CardHeader>
        </Card>
        <Card
          onClick={() => {
            navigate('/auth/join-lobby')
          }}
          className="flex-1 cursor-pointer"
        >
          <CardHeader className="flex flex-col gap-4 items-center text-center">
            <Waypoints className="h-6 w-6" />
            <CardTitle>Entrar em um lobby</CardTitle>
          </CardHeader>
        </Card>
      </section>
      <Card className="cursor-pointer" onClick={() => navigate('/auth/game')}>
        <CardHeader className="flex items-center gap-2 justify-center">
          <Gamepad className="h-6 w-6" />
          <CardTitle>Jogos</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center gap-2 justify-center">
          <Crown className="h-6 w-6" />
          <CardTitle>Ranking de vitórias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Ranking de Vencedores por jogo.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Jogo</TableHead>
                <TableHead>NickName</TableHead>
                <TableHead>Vitórias</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gameRank.map(({ id, name, winner }) => {
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{winner.nickName}</TableCell>
                    <TableCell>{winner.victoriesCount}</TableCell>
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
