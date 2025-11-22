import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Crown, GamepadDirectional, RouteOff } from 'lucide-react'
import { toast } from 'sonner'

import { useGetLobbyById } from '@/modules/lobby/hooks/use-get-lobby-by-id'
import { useLeaveLobby } from '@/modules/lobby/hooks/use-leave-lobby'

import { PlayerItem } from './components/player-item'
import { CreateMatchDialog } from './components/create-match-dialog'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogTrigger,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components'

export function Lobby() {
  const navigate = useNavigate()
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const {
    lobby,
    handlers: { handleGetLobbyById },
  } = useGetLobbyById()
  const {
    handlers: { handleLeaveLobby },
  } = useLeaveLobby()

  const [createMatchModalIsOpen, setCreateMatchModalIsOpen] = useState(false)

  const avaliableSpots = useMemo(() => {
    if (!lobby) return 0

    return lobby.game.maxPlayers - (lobby.players.length + 1)
  }, [lobby])

  const thisUserIsHost = useMemo(() => {
    const userData = localStorage.getItem('tabRank:user')
    if (!userData || !lobby) return false

    const { id: userId } = JSON.parse(userData)

    return lobby.host.id === userId
  }, [lobby])

  useEffect(() => {
    if (lobbyId) {
      handleGetLobbyById({ params: { id: lobbyId } })
    }
  }, [handleGetLobbyById, lobbyId])

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="text-center">
          <CardDescription>Código de Acesso:</CardDescription>
          <CardTitle> {lobby?.joinCode}</CardTitle>
          <CardDescription>{avaliableSpots} vagas</CardDescription>
        </CardHeader>
      </Card>
      <div className="w-full flex gap-4">
        <Dialog open={createMatchModalIsOpen}>
          <DialogTrigger asChild>
            <Card
              className="flex-1"
              onClick={() => {
                setCreateMatchModalIsOpen(true)
              }}
            >
              <CardHeader className="flex flex-col gap-4 items-center text-center">
                <GamepadDirectional className="h-6 w-6" />
                <CardTitle>Registrar Partida</CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          {lobby && (
            <CreateMatchDialog
              lobby={lobby}
              handleCloseModal={() => setCreateMatchModalIsOpen(false)}
            />
          )}
        </Dialog>
        <Card
          className="flex-1"
          onClick={() => {
            handleLeaveLobby({
              params: { lobbyId: lobbyId! },
              onSuccess: () => {
                toast.success('Você saiu do lobby com sucesso!')
                navigate('/auth/home')
              },
            })
          }}
        >
          <CardHeader className="flex flex-col gap-4 items-center text-center">
            <RouteOff className="h-6 w-6" />
            <CardTitle>Deixar Lobby</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{lobby?.game.name}</CardTitle>
          <CardDescription>Host: {lobby?.host.nickName}</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Jogadores</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {lobby?.host && (
            <PlayerItem
              key={lobby.host.id}
              nickName={lobby.host.nickName}
              description="Host"
            />
          )}
          {lobby?.players.map((player) => {
            return (
              <PlayerItem
                key={player.id}
                nickName={player.nickName}
                description="Player"
                showKickButton={thisUserIsHost}
              />
            )
          })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Partidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {lobby?.matches.map((match) => {
            return (
              <Item key={match.id} variant="muted">
                <ItemContent>
                  <ItemTitle>
                    <Crown className="w-4 h-4" />
                    <span className="font-bold">{match.winner.nickName}</span>
                  </ItemTitle>
                  <ItemDescription>{match.duration} minutos</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm" disabled>
                    {checkIfThisUserIsWinner(match.winner.id)
                      ? 'Você venceu! 😎'
                      : 'Você perdeu! 😩'}
                  </Button>
                </ItemActions>
              </Item>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}

function checkIfThisUserIsWinner(winnerId: string) {
  const userData = localStorage.getItem('tabRank:user')
  if (!userData) return false

  const { id: userId } = JSON.parse(userData)

  return winnerId === userId
}
