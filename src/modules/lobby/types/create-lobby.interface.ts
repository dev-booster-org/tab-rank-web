import type { Lobby } from './lobby.interface'

export interface CreateLobbyProps {
  gameId: string
}

export type CreateLobbyResponse = Lobby
