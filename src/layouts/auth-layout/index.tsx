import { Crown } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
} from '@/components'
import { useMemo } from 'react'

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

          <Avatar>
            <AvatarImage
              src={userData?.avatarUrl || ''}
              alt={userData?.nickName || 'User'}
            />
            <AvatarFallback>{acronym}</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
      <Outlet />
    </div>
  )
}
