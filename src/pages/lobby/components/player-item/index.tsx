import { AvatarFallback } from '@radix-ui/react-avatar'

import {
  Avatar,
  AvatarImage,
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components'
import { CircleOff } from 'lucide-react'

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
  return (
    <Item variant="outline">
      <ItemContent>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Avatar className="w-9 h-9">
              <AvatarImage
                src="https://github.com/jhonesjhonatas.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
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
