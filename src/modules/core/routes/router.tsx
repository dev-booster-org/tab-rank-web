import { createBrowserRouter, redirect } from 'react-router'

import {
  Game,
  Home,
  CreateLobby,
  NotFound,
  SignIn,
  SignUp,
  JoinLobby,
} from '@/pages'

import { AuthLayout } from '@/layouts/auth-layout'
import { setBearer } from '@/modules/core/services/set-bearer'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
    loader: () => {
      const accessToken = localStorage.getItem('tabRank:accessToken')
      const user = localStorage.getItem('tabRank:user')

      if (accessToken && user) {
        setBearer({ accessToken })

        redirect('/auth/home')

        return {
          user: JSON.parse(localStorage.getItem('tabRank:user') || '{}'),
        }
      }

      return null
    },
    errorElement: <NotFound />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    loader: () => {
      const accessToken = localStorage.getItem('tabRank:accessToken')
      const user = localStorage.getItem('tabRank:user')

      if (!accessToken || !user) {
        redirect('/')
        return null
      }

      setBearer({ accessToken })

      return {
        user: JSON.parse(localStorage.getItem('tabRank:user') || '{}'),
      }
    },
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
        path: 'create-lobby',
        element: <CreateLobby />,
      },
      {
        path: 'join-lobby',
        element: <JoinLobby />,
      },
    ],
  },
])
