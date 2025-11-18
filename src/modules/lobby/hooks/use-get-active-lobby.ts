import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import { getActiveLobbyService } from '@/modules/lobby/services/lobby-service'

import type { GetActiveLobbyResponse } from '@/modules/lobby/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useGetActiveLobby() {
  const [loading, setLoading] = useState(false)
  const [activeLobby, setActiveLobby] = useState<GetActiveLobbyResponse>(null)

  const handleGetActiveLobby = useCallback(
    async ({
      onSuccess,
      onError,
    }: Handler<undefined, GetActiveLobbyResponse>) => {
      setLoading(true)

      try {
        const { data } = await getActiveLobbyService()

        if (onSuccess) {
          onSuccess(data)
          return
        }

        setActiveLobby(data)
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

  return { loading, activeLobby, handlers: { handleGetActiveLobby } }
}
