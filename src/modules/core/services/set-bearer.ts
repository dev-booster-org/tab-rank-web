import { api } from '@/modules/core/services/api'

interface SetBearerProps {
  accessToken: string
}

export function setBearer({ accessToken }: SetBearerProps) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}
