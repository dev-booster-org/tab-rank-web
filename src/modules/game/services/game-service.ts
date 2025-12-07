import { request } from '@/modules/core/services/request'

import type {
  CreateGameProps,
  CreateGameResponse,
  ListGameRankByUserProps,
  ListGameRankByUserResponse,
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

export function createGameService(params: CreateGameProps) {
  return request<CreateGameResponse>({
    url: '/game/create',
    method: 'post',
    body: params,
  })
}

export function listGameRankByUserService(props: ListGameRankByUserProps) {
  return request<ListGameRankByUserResponse[]>({
    url: `/game/list-game-rank-by-user/${props.userId}`,
    method: 'get',
  })
}
