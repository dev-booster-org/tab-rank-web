import { request } from '@/modules/core/services/request'

import type { ListGamesProps, ListGamesResponse } from '@modules/game/types'

export function listGamesService(params: ListGamesProps) {
  return request<ListGamesResponse>({
    url: '/game/list',
    method: 'get',
    params,
  })
}
