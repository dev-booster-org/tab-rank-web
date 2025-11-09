import { request } from '@/modules/core/services/request'

import type { CreateUserProps, CreateUserResponse } from '@modules/user/types'

export function createUserService(params: CreateUserProps) {
  return request<CreateUserResponse>({
    url: '/user/create',
    method: 'post',
    body: params,
  })
}
