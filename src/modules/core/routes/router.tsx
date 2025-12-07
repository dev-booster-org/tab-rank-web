import { createBrowserRouter, redirect } from 'react-router'

import {
  Game,
  Home,
  CreateLobby,
  Error,
  SignIn,
  SignUp,
  JoinLobby,
  CreateGame,
  Lobby,
  Profile,
  ChangeLog,
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

        return redirect('/auth/home')
      }

      return null
    },
    errorElement: <Error />,
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
        return redirect('/')
      }

      setBearer({ accessToken })

      return null
    },
    errorElement: <Error />,
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
      {
        path: 'lobby/:lobbyId',
        element: <Lobby />,
      },
      {
        path: 'create-game',
        element: <CreateGame />,
      },
      {
        path: 'profile/:userId',
        element: <Profile />,
      },
      {
        path: 'change-log',
        element: <ChangeLog />,
      },
    ],
  },
])
