import { RouterProvider } from 'react-router'

import { ThemeProvider } from '@modules/core/contexts/theme-provider'
import { router } from '@modules/core/routes/router'
import { Toaster } from '@/components'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </ThemeProvider>
  )
}
