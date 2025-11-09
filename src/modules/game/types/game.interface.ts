import type { GameTypes } from './game-types.enum'

export type Game = {
  id: string
  name: string
  type: GameTypes[]
  coverImageUrl: string | null
  minPlayers: number
  maxPlayers: number
  createdAt: Date
  updatedAt: Date
}
