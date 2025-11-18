import { useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { createMatchService } from '@modules/match/services/match-service'

import type {
  CreateMatchProps,
  CreateMatchResponse,
} from '@modules/match/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useCreateMatch() {
  const [loading, setLoading] = useState(false)

  const handleCreateMatch = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<CreateMatchProps, CreateMatchResponse>) => {
      setLoading(true)

      try {
        const { data } = await createMatchService(params)

        if (onSuccess) {
          onSuccess(data)
          return
        }

        toast.success('Partida registrada com sucesso!')
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(
            error.response?.data.message || 'Falha ao registrar partida.',
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
    handlers: {
      handleCreateMatch,
    },
  }
}
