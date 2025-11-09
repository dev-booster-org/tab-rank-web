import type { GameTypes } from './game-types.enum'
import type { Game } from './game.interface'

export interface ListGamesProps {
  search?: string
  type?: GameTypes[]
}

export type ListGamesResponse = Game[]
