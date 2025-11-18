import { request } from '@/modules/core/services/request'

import type {
  CreateMatchProps,
  CreateMatchResponse,
} from '@/modules/match/types'

export function createMatchService(params: CreateMatchProps) {
  return request<CreateMatchResponse>({
    url: '/match/create',
    method: 'post',
    body: params,
  })
}
