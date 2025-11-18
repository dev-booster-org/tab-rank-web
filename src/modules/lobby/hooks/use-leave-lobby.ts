import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import { leaveLobbyService } from '@/modules/lobby/services/lobby-service'

import type { LeaveLobbyProps, LeaveLobbyResponse } from '@/modules/lobby/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useLeaveLobby() {
  const [loading, setLoading] = useState(false)

  const handleLeaveLobby = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<LeaveLobbyProps, LeaveLobbyResponse>) => {
      setLoading(true)

      try {
        const { data } = await leaveLobbyService(params)

        if (onSuccess) {
          onSuccess(data)
          return
        }

        toast.success('Lobby deixado com sucesso!')
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(
            error.response?.data.message || 'Falha ao deixar o lobby.',
          )
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { loading, handlers: { handleLeaveLobby } }
}
