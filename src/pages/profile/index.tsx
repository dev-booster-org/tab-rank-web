import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router'
import { Edit } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useGetUserById } from '@/modules/user/hooks/use-get-user-by-id'
import { useGetMatchesByUserId } from '@/modules/match/hooks/use-get-matches-by-user-id'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
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
import { useListGameRankByUser } from '@/modules/game/hooks/use-list-game-rank-by-user'

export function Profile() {
  const { userId } = useParams()
  const {
    user,
    handlers: { handleGetUserById },
  } = useGetUserById()
  const {
    data: matchesData,
    loading: matchesLoading,
    handlers: { handleGetMatchesByUserId },
  } = useGetMatchesByUserId()
  const {
    loading: gameRankLoading,
    gameRank,
    handlers: { handleListGameRankByUser },
  } = useListGameRankByUser()

  const acronym = useMemo(() => {
    if (!user?.nickName) return 'U'
    return user.nickName.slice(0, 2).toUpperCase()
  }, [user])

  useEffect(() => {
    if (userId) {
      handleGetUserById({ params: { id: userId } })
      handleGetMatchesByUserId({ params: { userId, limit: 5 } })
      handleListGameRankByUser({ params: { userId } })
    }
  }, [
    userId,
    handleGetUserById,
    handleGetMatchesByUserId,
    handleListGameRankByUser,
  ])

  return (
    <div className="p-4 flex flex-col gap-4">
      <section className="w-full flex flex-col items-center gap-4">
        <Avatar className="w-32 h-32">
          <AvatarImage src={''} alt={user?.nickName || 'User'} />
          <AvatarFallback>{acronym}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl">{user?.nickName}</h1>
          <Button size="icon" variant="ghost">
            <Edit />
          </Button>
        </div>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Seu Ranking</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Seu ranking.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Jogo</TableHead>
                <TableHead>Vit</TableHead>
                <TableHead>Part</TableHead>
              </TableRow>
            </TableHeader>
            {gameRankLoading ? (
              <TableBody>
                {Array.from({ length: 3 }).map((_, index) => (
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
                {gameRank.map((rank) => {
                  return (
                    <TableRow key={rank.game.id}>
                      <TableCell className="font-medium">
                        {rank.game.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {rank.victoriesCount}
                      </TableCell>
                      <TableCell className="font-medium">
                        {rank.matchesCount}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Partidas recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Partidas recentes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Jogo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            {matchesLoading ? (
              <TableBody>
                {Array.from({ length: 3 }).map((_, index) => (
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
                {matchesData?.matches.map((match) => {
                  return (
                    <TableRow key={match.id}>
                      <TableCell className="font-medium">
                        {match.game.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {format(new Date(match.createdAt), 'dd/MM', {
                          locale: ptBR,
                        })}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Button variant="outline" size="sm" disabled>
                          {match.winner.id === userId
                            ? 'Venceu 💁‍♂️'
                            : 'Perdeu 🤣'}
                        </Button>
                      </TableCell>
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
