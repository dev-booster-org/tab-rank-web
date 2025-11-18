import type { Match } from './match.interface'

export interface CreateMatchProps {
  duration: number
  gameId: string
  lobbyId: string
  winnerId?: string | null
  playerIds: string[]
}

export type CreateMatchResponse = Match
