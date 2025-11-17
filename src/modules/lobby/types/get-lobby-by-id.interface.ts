import type { Game } from '@/modules/game/types'
import type { Lobby } from './lobby.interface'
import type { User } from '@/modules/user/types'

export interface GetLobbyByIdProps {
  id: string
}

export interface GetLobbyByIdResponse extends Lobby {
  game: Game
  host: User
  players: User[]
}
