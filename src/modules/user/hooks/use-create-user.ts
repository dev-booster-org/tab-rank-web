import { useCallback, useState } from 'react'

import type { CreateUserProps, CreateUserResponse } from '@modules/user/types'
import { createUserService } from '@modules/user/services/user-service'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false)

  const handleCreateUser = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<CreateUserProps, CreateUserResponse>) => {
      setLoading(true)

      try {
        const { data } = await createUserService(params)

        if (onSuccess) {
          onSuccess(data)
          return
        }

        toast.success('Usuário criado com sucesso!')
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          console.log('---------- DEBUG ----------')
          console.log(error.response)
          console.log('---------- DEBUG ----------')

          toast.error(error.response?.data.message || 'Falha ao criar usuário.')
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
      handleCreateUser,
    },
  }
}
