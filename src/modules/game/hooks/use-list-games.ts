import { useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { listGamesService } from '@modules/game/services/game-service'

import type {
  Game,
  ListGamesProps,
  ListGamesResponse,
} from '@modules/game/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useListGames() {
  const [loading, setLoading] = useState(false)
  const [games, setGames] = useState<Game[]>([])

  const handleListGames = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<ListGamesProps, ListGamesResponse>) => {
      setLoading(true)

      try {
        const { data } = await listGamesService(params)

        if (onSuccess) {
          onSuccess(data)
          return
        }

        setGames(data)
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(error.response?.data.message || 'Falha ao listar jogos.')
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return {
    loading,
    games,
    handlers: {
      handleListGames,
    },
  }
}
