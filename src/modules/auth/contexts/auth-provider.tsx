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
  user: SignInResponse['user'] | null
  isAuthenticated: boolean
  handlers: {
    handleSignIn: (props: Handler<SignInProps, SignInResponse>) => void
  }
}

const AuthContext = createContext<AuthContextSchema>({
  loading: false,
  user: null,
  isAuthenticated: false,
  handlers: {
    handleSignIn: () => {},
  },
})

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<SignInResponse['user'] | null>(null)

  const handleSignIn = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: Handler<SignInProps, SignInResponse>) => {
      setLoading(true)

      try {
        const { data } = await signInService(params)

        localStorage.setItem('tabRank:accessToken', data.accessToken)

        setIsAuthenticated(true)
        setUser(data.user)
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

    if (!accessToken) return

    setBearer({ accessToken })
    setIsAuthenticated(true)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        isAuthenticated,
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
