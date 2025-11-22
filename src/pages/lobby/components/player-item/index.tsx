import { useMemo } from 'react'
import { CircleOff } from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components'

interface PlayerItemProps {
  nickName: string
  description: string
  showKickButton?: boolean
}

export function PlayerItem({
  nickName,
  description,
  showKickButton,
}: PlayerItemProps) {
  const acronym = useMemo(() => {
    return nickName.slice(0, 2).toUpperCase()
  }, [nickName])

  return (
    <Item variant="outline">
      <ItemContent>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Avatar className="w-9 h-9">
              <AvatarImage src={''} alt={nickName || 'User'} />
              <AvatarFallback>{acronym}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <ItemTitle>{nickName}</ItemTitle>
              <ItemDescription>{description}</ItemDescription>
            </div>
          </div>
          {showKickButton && (
            <Button size="icon" variant="destructive">
              <CircleOff />
            </Button>
          )}
        </div>
      </ItemContent>
    </Item>
  )
}
