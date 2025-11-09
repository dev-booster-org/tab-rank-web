import { createBrowserRouter } from 'react-router'

import { Game, Home, Lobby, NotFound, SignIn, SignUp } from '@/pages'
import { AuthLayout } from '@/layouts/auth-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
    errorElement: <NotFound />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'game',
        element: <Game />,
      },
      {
        path: 'lobby',
        element: <Lobby />,
      },
    ],
  },
])
