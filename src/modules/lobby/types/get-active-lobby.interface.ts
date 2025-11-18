import type { Lobby } from '@/modules/lobby/types/lobby.interface'
import type { User } from '@/modules/user/types'

interface LobbyWithRelations extends Lobby {
  players: User[]
  host: User
}

export type GetActiveLobbyResponse = LobbyWithRelations | null
