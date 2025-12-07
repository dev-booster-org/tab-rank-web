import { useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { listGameRankByUserService } from '@modules/game/services/game-service'

import type {
  ListGameRankByUserProps,
  ListGameRankByUserResponse,
} from '@modules/game/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useListGameRankByUser() {
  const [loading, setLoading] = useState(false)
  const [gameRank, setGameRank] = useState<ListGameRankByUserResponse[]>([])

  const handleListGameRankByUser = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<ListGameRankByUserProps, ListGameRankByUserResponse[]>) => {
      setLoading(true)

      try {
        const { data } = await listGameRankByUserService(params)

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

          toast.error(error.response?.data.message || 'Falha ao listar rank.')
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
      handleListGameRankByUser,
    },
  }
}
