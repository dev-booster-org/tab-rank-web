import { useEffect } from 'react'
import { Crown, Gamepad, PlusCircle, LogIn, Route } from 'lucide-react'
import { useNavigate } from 'react-router'

import { useListGameRank } from '@/modules/game/hooks/use-list-game-rank'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components'
import { useGetActiveLobby } from '@/modules/lobby/hooks/use-get-active-lobby'

export function Home() {
  const navigate = useNavigate()
  const {
    gameRank,
    loading: gameRankLoading,
    handlers: { handleListGameRank },
  } = useListGameRank()
  const {
    activeLobby,
    handlers: { handleGetActiveLobby },
  } = useGetActiveLobby()

  useEffect(() => {
    handleListGameRank({ params: undefined })
    handleGetActiveLobby({ params: undefined })
  }, [handleListGameRank, handleGetActiveLobby])

  return (
    <div className="flex flex-col gap-4 w-full lg:w-3/12 lg:mx-auto">
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
            <LogIn className="h-6 w-6" />
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
      {activeLobby && (
        <Card
          className="cursor-pointer"
          onClick={() => navigate(`/auth/lobby/${activeLobby.id}`)}
        >
          <CardHeader className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Route className="h-6 w-6" />
              <CardTitle>Você está em um lobby ativo</CardTitle>
            </div>
            <CardDescription>Toque aqui para entrar no lobby.</CardDescription>
            <CardDescription>
              Players no lobby:{' '}
              {[
                activeLobby.host.nickName,
                ...activeLobby.players.map((player) => player.nickName),
              ].join(', ')}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      <Card>
        <CardHeader className="flex items-center gap-2 justify-center">
          <Crown className="h-6 w-6" />
          <CardTitle>Ranking global</CardTitle>
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
            {gameRankLoading ? (
              <TableBody>
                {Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
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
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
