import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

import type {
  SignInProps,
  SignInResponse,
} from '@/modules/auth/types/sign-in.interface'
import { signInService } from '@/modules/auth/services/auth-services'
import { setBearer } from '@/modules/core/services/set-bearer'

type Handler<T, R> = {
  params: T
  onSuccess?: (data: R) => void
  onError?: (error: Error) => void
}

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextSchema {
  loading: boolean
  handlers: {
    handleSignIn: (props: Handler<SignInProps, SignInResponse>) => void
  }
}

const AuthContext = createContext<AuthContextSchema>({
  loading: false,
  handlers: {
    handleSignIn: () => {},
  },
})

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true)

  const handleSignIn = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<SignInProps, SignInResponse>) => {
      setLoading(true)

      try {
        const { data } = await signInService(params)

        console.log('---------- DEBUG ----------')
        console.log(data)
        console.log('---------- DEBUG ----------')

        localStorage.setItem('tabRank:accessToken', data.accessToken)
        localStorage.setItem('tabRank:user', JSON.stringify(data.user))

        setBearer({ accessToken: data.accessToken })

        if (onSuccess) onSuccess(data)
      } catch (error) {
        if (isAxiosError(error)) {
          if (onError) {
            onError(error)
            return
          }

          toast.error(
            error.response?.data.message || 'Falha ao realizar login.',
          )
        }
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    const accessToken = localStorage.getItem('tabRank:accessToken')
    const user = localStorage.getItem('tabRank:user')

    if (!accessToken || !user) return

    setBearer({ accessToken })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loading,
        handlers: {
          handleSignIn,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined)
    throw new Error('useAuthContext must be used within an AuthProvider')

  return context
}
