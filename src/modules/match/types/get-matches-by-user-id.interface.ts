import type { Match } from './match.interface'

export interface GetMatchesByUserIdProps {
  userId: string
  page?: number
  limit?: number
}

interface MatchWithRelations extends Match {
  game: {
    id: string
    name: string
  }
  winner: {
    id: string
    nickName: string
  }
}

export interface GetMatchesByUserIdResponse {
  matches: MatchWithRelations[]
  totalCount: number
  hasMore: boolean
}
