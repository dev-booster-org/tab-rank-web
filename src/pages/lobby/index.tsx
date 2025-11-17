import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router'
import { GamepadDirectional, RouteOff } from 'lucide-react'

import { useGetLobbyById } from '@/modules/lobby/hooks/use-get-lobby-by-id'

import { PlayerItem } from './components/player-item'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components'

export function Lobby() {
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const {
    lobby,
    handlers: { handleGetLobbyById },
  } = useGetLobbyById()

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
        <Card className="flex-1">
          <CardHeader className="flex flex-col gap-4 items-center text-center">
            <GamepadDirectional className="h-6 w-6" />
            <CardTitle>Iniciar Partida</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-col gap-4 items-center text-center">
            <RouteOff className="h-6 w-6" />
            <CardTitle>Fechar Lobby</CardTitle>
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
    </div>
  )
}
