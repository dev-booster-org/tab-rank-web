import { useRouteError } from 'react-router'

interface ErrorType {
  statusText?: string
  message?: string
}

export function Error() {
  const error = useRouteError() as ErrorType

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <span className="font-bold text-2xl">Oops! 😅</span>
      <span>Algo deu errado ao carregar esta página.</span>
      {error.statusText || error.message ? (
        <span>{error.statusText || error.message}</span>
      ) : null}
    </div>
  )
}
