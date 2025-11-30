import { request } from '@/modules/core/services/request'

import type {
  CreateMatchProps,
  CreateMatchResponse,
} from '@/modules/match/types'

import type {
  GetMatchesByUserIdProps,
  GetMatchesByUserIdResponse,
} from '@/modules/match/types/get-matches-by-user-id.interface'

export function createMatchService(params: CreateMatchProps) {
  return request<CreateMatchResponse>({
    url: '/match/create',
    method: 'post',
    body: params,
  })
}

export function getMatchesByUserIdService(params: GetMatchesByUserIdProps) {
  return request<GetMatchesByUserIdResponse>({
    url: `/match/${params.userId}/get-by-user-id`,
    method: 'get',
  })
}
