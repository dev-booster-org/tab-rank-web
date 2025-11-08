import { createBrowserRouter } from 'react-router'

import { Home, SignIn } from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
])
