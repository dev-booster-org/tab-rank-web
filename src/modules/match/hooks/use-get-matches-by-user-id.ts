import { useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { getMatchesByUserIdService } from '@modules/match/services/match-service'

import type {
  GetMatchesByUserIdProps,
  GetMatchesByUserIdResponse,
} from '@/modules/match/types/get-matches-by-user-id.interface'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useGetMatchesByUserId() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GetMatchesByUserIdResponse>()

  const handleGetMatchesByUserId = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<GetMatchesByUserIdProps, GetMatchesByUserIdResponse>) => {
      setLoading(true)

      try {
        const { data } = await getMatchesByUserIdService(params)

        if (onSuccess) {
          onSuccess(data)
        }

        setData(data)
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(
            error.response?.data.message || 'Falha ao buscar partida.',
          )
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return {
    loading,
    data,
    handlers: {
      handleGetMatchesByUserId,
    },
  }
}
