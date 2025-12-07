import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { io, type Socket } from 'socket.io-client'

interface SocketProviderProps {
  children: ReactNode
}

type SocketContextSchema = {
  socket: Socket
}

const SocketContext = createContext<SocketContextSchema | null>(null)

export function SocketProvider({ children }: SocketProviderProps) {
  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_API_URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        timeout: 20000,
      }),
    [],
  )

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return context
}
