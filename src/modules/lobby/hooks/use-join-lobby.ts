import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import { joinLobbyService } from '@/modules/lobby/services/lobby-service'

import type { JoinLobbyProps, JoinLobbyResponse } from '@/modules/lobby/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useJoinLobby() {
  const [loading, setLoading] = useState(false)

  const handleJoinLobby = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<JoinLobbyProps, JoinLobbyResponse>) => {
      setLoading(true)

      try {
        const { data } = await joinLobbyService(params)
        if (onSuccess) {
          onSuccess(data)
          return
        }

        toast.success('Agora você faz parte do lobby!')
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(
            error.response?.data.message || 'Falha ao entrar no lobby.',
          )
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { loading, handlers: { handleJoinLobby } }
}
