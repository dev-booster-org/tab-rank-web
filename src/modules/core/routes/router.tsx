import { createBrowserRouter } from 'react-router'

import { Home, NotFound, SignIn, SignUp } from '@/pages'

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
    children: [
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
])
