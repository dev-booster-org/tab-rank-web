import { RouterProvider } from 'react-router'

import { ThemeProvider } from '@modules/core/contexts/theme-provider'
import { router } from '@modules/core/routes/router'
import { Toaster } from '@/components'
import { AuthProvider } from '@/modules/auth/contexts/auth-provider'

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </ThemeProvider>
    </AuthProvider>
  )
}
