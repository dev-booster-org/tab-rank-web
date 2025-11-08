import { RouterProvider } from 'react-router'

import { ThemeProvider } from '@modules/core/contexts/theme-provider'
import { router } from '@modules/core/routes/router'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
