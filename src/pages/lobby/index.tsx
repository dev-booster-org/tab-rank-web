import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useGetLobbyById } from '@/modules/lobby/hooks/use-get-lobby-by-id'

import {
  Button,
  Card,
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
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{lobby?.game.name}</CardTitle>
          <CardDescription>Host: {lobby?.host.nickName}</CardDescription>
        </CardHeader>
      </Card>
      <Button>Iniciar Partida</Button>
      <Card>
        <CardHeader>
          <CardTitle>Jogadores</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
