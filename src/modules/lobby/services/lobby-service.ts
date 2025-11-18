import { request } from '@/modules/core/services/request'

import type {
  CreateLobbyProps,
  CreateLobbyResponse,
  GetLobbyByIdProps,
  GetLobbyByIdResponse,
  JoinLobbyProps,
  JoinLobbyResponse,
  GetActiveLobbyResponse,
  LeaveLobbyResponse,
  LeaveLobbyProps,
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

export function joinLobbyService({ joinCode }: JoinLobbyProps) {
  return request<JoinLobbyResponse>({
    url: `/lobby/join`,
    method: 'post',
    body: { joinCode },
  })
}

export function getActiveLobbyService() {
  return request<GetActiveLobbyResponse>({
    url: `/lobby/active`,
    method: 'get',
  })
}

export function leaveLobbyService(props: LeaveLobbyProps) {
  return request<LeaveLobbyResponse>({
    url: `/lobby/leave`,
    method: 'post',
    body: props,
  })
}
