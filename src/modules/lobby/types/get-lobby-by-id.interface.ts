import type { Game } from '@/modules/game/types'
import type { Lobby } from '@/modules/lobby/types'
import type { User } from '@/modules/user/types'
import type { Match } from '@/modules/match/types'

export interface GetLobbyByIdProps {
  id: string
}

export interface MatchWithRelations extends Match {
  players: User[]
  winner: User
}

export interface GetLobbyByIdResponse extends Lobby {
  game: Game
  host: User
  players: User[]
  matches: MatchWithRelations[]
}
