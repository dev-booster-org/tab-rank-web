import type { Lobby } from './lobby.interface'

export interface JoinLobbyProps {
  joinCode: string
}

export type JoinLobbyResponse = Lobby
