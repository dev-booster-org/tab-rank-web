import { request } from '@/modules/core/services/request'

import type {
  ListGameRankResponse,
  ListGamesProps,
  ListGamesResponse,
} from '@modules/game/types'

export function listGamesService(params: ListGamesProps) {
  return request<ListGamesResponse>({
    url: '/game/list',
    method: 'get',
    params,
  })
}

export function listGameRankService() {
  return request<ListGameRankResponse[]>({
    url: '/game/list-game-rank',
    method: 'get',
  })
}
