import { Crown } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
} from '@/components'

export function AuthLayout() {
  const navigate = useNavigate()

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
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
      <Outlet />
    </div>
  )
}
