import { useCallback, useMemo } from 'react'
import { Crown, LogOut, User } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components'

export function AuthLayout() {
  const navigate = useNavigate()

  const userData = useMemo(() => {
    const data = localStorage.getItem('tabRank:user')
    return data ? JSON.parse(data) : null
  }, [])

  const acronym = useMemo(() => {
    if (!userData?.nickName) return 'U'
    return userData.nickName.slice(0, 2).toUpperCase()
  }, [userData])

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('tabRank:token')
    localStorage.removeItem('tabRank:user')

    navigate('/')
  }, [navigate])

  return (
    <div className="p-4 flex flex-col gap-4">
      <Card className="bg-transparent py-4 px-0">
        <CardContent className="flex items-center justify-between">
          <div
            className="flex items-center gap-2"
            onClick={() => {
              navigate('/auth/home')
            }}
          >
            <Crown />
            <span className="font-bold text-xl">tabRank</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={userData?.avatarUrl || ''}
                  alt={userData?.nickName || 'User'}
                />
                <AvatarFallback>{acronym}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/auth/profile/${userData.id}`)
                }}
              >
                <User />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={handleSignOut}
              >
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
      <Outlet />
    </div>
  )
}
