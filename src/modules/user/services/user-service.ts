import { request } from '@/modules/core/services/request'

import type {
  CreateUserProps,
  CreateUserResponse,
  GetUserByIdProps,
  GetUserByIdResponse,
} from '@modules/user/types'

export function createUserService(params: CreateUserProps) {
  return request<CreateUserResponse>({
    url: '/user/create',
    method: 'post',
    body: params,
  })
}

export function getUserByIdService({ id }: GetUserByIdProps) {
  return request<GetUserByIdResponse>({
    url: `/user/${id}/get-by-id`,
    method: 'get',
  })
}
