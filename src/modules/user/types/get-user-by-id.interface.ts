import type { User } from '@modules/user/types/user.interface'

export interface GetUserByIdProps {
  id: string
}

export type GetUserByIdResponse = User
