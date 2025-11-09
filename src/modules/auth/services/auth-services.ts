import { request } from '@/modules/core/services/request'

import type {
  SignInProps,
  SignInResponse,
} from '@/modules/auth/types/sign-in.interface'

export function signInService(params: SignInProps) {
  return request<SignInResponse>({
    url: '/auth/sign-in',
    method: 'post',
    body: params,
  })
}
