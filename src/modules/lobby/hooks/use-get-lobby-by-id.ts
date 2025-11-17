import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import { getLobbyByIdService } from '@/modules/lobby/services/lobby-service'

import type {
  GetLobbyByIdProps,
  GetLobbyByIdResponse,
} from '@/modules/lobby/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useGetLobbyById() {
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

  return { loading, lobby, handlers: { handleGetLobbyById } }
}
