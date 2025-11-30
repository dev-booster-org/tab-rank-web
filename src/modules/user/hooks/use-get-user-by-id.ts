import { useCallback, useState } from 'react'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { getUserByIdService } from '@modules/user/services/user-service'

import type { GetUserByIdProps, GetUserByIdResponse } from '@modules/user/types'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useGetUserById() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<GetUserByIdResponse | null>(null)

  const handleGetUserById = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<GetUserByIdProps, GetUserByIdResponse>) => {
      setLoading(true)

      try {
        const { data } = await getUserByIdService(params)

        if (onSuccess) {
          onSuccess(data)
          return
        }

        setUser(data)
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(error.response?.data.message || 'Falha ao obter usuário.')
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return {
    loading,
    user,
    handlers: {
      handleGetUserById,
    },
  }
}
