import { useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { listGameRankService } from '@modules/game/services/game-service'

import type { ListGameRankResponse } from '@modules/game/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useCreateGame() {
  const [loading, setLoading] = useState(false)
  const [gameRank, setGameRank] = useState<ListGameRankResponse[]>([])

  const handleListGameRank = useCallback(
    async ({
      onSuccess,
      onError,
    }: Handler<undefined, ListGameRankResponse[]>) => {
      setLoading(true)

      try {
        const { data } = await listGameRankService()

        if (onSuccess) {
          onSuccess(data)
          return
        }

        setGameRank(data)
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
    gameRank,
    handlers: {
      handleListGameRank,
    },
  }
}
