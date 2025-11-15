import { useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { createGameService } from '@modules/game/services/game-service'

import type { CreateGameProps, CreateGameResponse } from '@modules/game/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useCreateGame() {
  const [loading, setLoading] = useState(false)

  const handleCreateGame = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<CreateGameProps, CreateGameResponse>) => {
      setLoading(true)

      try {
        const { data } = await createGameService(params)

        if (onSuccess) {
          onSuccess(data)
          return
        }

        toast.success('Jogo criado com sucesso!')
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(error.response?.data.message || 'Falha ao criar jogo.')
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return {
    loading,
    handlers: {
      handleCreateGame,
    },
  }
}
