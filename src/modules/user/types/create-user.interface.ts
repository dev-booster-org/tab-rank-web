import type { User } from '@modules/user/types/user.interface'

export interface CreateUserProps {
  email: string
  nickName: string
  password: string
}

export type CreateUserResponse = User
