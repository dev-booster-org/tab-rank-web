import { useMemo } from 'react'
import { NavLink, useRouteError } from 'react-router'

import { Button } from '@/components'

interface ErrorType {
  status: number
  statusText: string
  internal: boolean
  data: string | null
  error: {
    message: string
    stack: string
  }
}

export function Error() {
  const error = useRouteError() as ErrorType

  const errorMessage = useMemo(() => {
    if (error.status === 404) {
      return `${error.status} - Página não encontrada.`
    }

    if (error.status === 500) {
      return `${error.status} - Erro interno do servidor.`
    }

    return `${error.status} - ${error.statusText || 'Erro desconhecido.'}`
  }, [error.status, error.statusText])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <span className="font-bold text-2xl">Oops! 😅</span>
      <span>Algo deu errado ao carregar esta página.</span>
      {errorMessage}
      <NavLink to="/">
        <Button>Voltar para a página inicial</Button>
      </NavLink>
    </div>
  )
}
