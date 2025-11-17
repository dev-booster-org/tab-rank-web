import { request } from '@/modules/core/services/request'

import type {
  CreateLobbyProps,
  CreateLobbyResponse,
  GetLobbyByIdProps,
  GetLobbyByIdResponse,
} from '@modules/lobby/types'

export function createLobbyService(params: CreateLobbyProps) {
  return request<CreateLobbyResponse>({
    url: '/lobby/create',
    method: 'post',
    body: params,
  })
}

export function getLobbyByIdService({ id }: GetLobbyByIdProps) {
  return request<GetLobbyByIdResponse>({
    url: `/lobby/${id}`,
    method: 'get',
  })
}
