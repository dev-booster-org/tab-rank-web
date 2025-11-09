export interface SignInProps {
  identifier: string
  password: string
}

export interface SignInResponse {
  accessToken: string
  user: {
    id: string
    nickName: string
    email: string
  }
}
