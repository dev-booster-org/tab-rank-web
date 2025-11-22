import { RouterProvider } from 'react-router'

import { AuthProvider } from '@/modules/auth/contexts/auth-provider'
import { SocketProvider } from '@modules/core/contexts/socket-provider'
import { ThemeProvider } from '@modules/core/contexts/theme-provider'

import { router } from '@modules/core/routes/router'
import { Toaster } from '@/components'

export function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" />
        </ThemeProvider>
      </SocketProvider>
    </AuthProvider>
  )
}
