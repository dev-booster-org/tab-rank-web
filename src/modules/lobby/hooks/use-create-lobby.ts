import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import { createLobbyService } from '@/modules/lobby/services/lobby-service'

import type {
  CreateLobbyProps,
  CreateLobbyResponse,
} from '@/modules/lobby/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useCreateLobby() {
  const [loading, setLoading] = useState(false)

  const handleCreateLobby = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<CreateLobbyProps, CreateLobbyResponse>) => {
      setLoading(true)

      try {
        const { data } = await createLobbyService(params)

        if (onSuccess) {
          onSuccess(data)
          return
        }

        toast.success('Lobby criado com sucesso!')
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(error.response?.data.message || 'Falha ao criar lobby.')
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { loading, handlers: { handleCreateLobby } }
}
