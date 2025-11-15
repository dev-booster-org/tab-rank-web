import type { GameTypes } from './game-types.enum'
import type { Game } from './game.interface'

export interface CreateGameProps {
  name: string
  type: GameTypes[]
  maxPlayers: number
  minPlayers: number
  coverImageUrl?: string
}

export type CreateGameResponse = Game
