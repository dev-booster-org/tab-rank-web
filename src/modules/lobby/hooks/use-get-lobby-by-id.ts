import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import { getLobbyByIdService } from '@/modules/lobby/services/lobby-service'

import type {
  GetLobbyByIdProps,
  GetLobbyByIdResponse,
  MatchWithRelations,
} from '@/modules/lobby/types'
import { useSocket } from '@/modules/core/contexts/socket-provider'
import type { User } from '@/modules/user/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useGetLobbyById() {
  const { socket } = useSocket()

  const [loading, setLoading] = useState(false)
  const [lobby, setLobby] = useState<GetLobbyByIdResponse | null>(null)

  const handleGetLobbyById = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<GetLobbyByIdProps, GetLobbyByIdResponse>) => {
      setLoading(true)

      try {
        const { data } = await getLobbyByIdService(params)

        if (onSuccess) {
          onSuccess(data)
          return
        }

        setLobby(data)
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(error.response?.data.message || 'Falha ao obter lobby.')
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    const handleJoinedPlayer = (data: unknown) => {
      setLobby((prev) => {
        if (!prev) return prev

        return { ...prev, players: [...prev.players, data as User] }
      })
    }

    socket.on('lobby:player-joined', handleJoinedPlayer)

    return () => {
      socket.off('lobby:player-joined', handleJoinedPlayer)
    }
  }, [lobby, socket])

  useEffect(() => {
    const handlePlayerLeft = (playerId: string) => {
      setLobby((prev) => {
        if (!prev) return prev

        return {
          ...prev,
          players: prev.players.filter((player) => player.id !== playerId),
        }
      })
    }

    socket.on('lobby:player-left', handlePlayerLeft)

    return () => {
      socket.off('lobby:player-left', handlePlayerLeft)
    }
  }, [lobby, socket])

  useEffect(() => {
    const handleHostLeft = (newHostId: string) => {
      setLobby((prev) => {
        if (!prev) return prev

        const newHost = prev.players.find((player) => player.id === newHostId)!
        const newListOfPlayers = prev.players.filter(
          (player) => player.id !== newHostId,
        )

        return {
          ...prev,
          host: newHost,
          players: newListOfPlayers,
        }
      })
    }

    socket.on('lobby:host-left', handleHostLeft)

    return () => {
      socket.off('lobby:host-left', handleHostLeft)
    }
  }, [lobby, socket])

  useEffect(() => {
    const handleMatchCreated = (match: MatchWithRelations) => {
      setLobby((prev) => {
        if (!prev) return prev

        return {
          ...prev,
          matches: [...prev.matches, match],
        }
      })
    }

    socket.on('match:created', handleMatchCreated)

    return () => {
      socket.off('match:created', handleMatchCreated)
    }
  }, [lobby, socket])

  return { loading, lobby, handlers: { handleGetLobbyById } }
}
