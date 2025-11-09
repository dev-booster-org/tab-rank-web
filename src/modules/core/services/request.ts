/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/modules/core/services/api'

type RequestProps = {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch'
  body?: any
  params?: any
  cacheTime?: number
}

type Respose<T> = {
  code: number
  data: T
}

export async function request<T>({
  url,
  method = 'get',
  body,
  params,
}: RequestProps): Promise<Respose<T>> {
  const query = {}

  if (method === 'get') {
    Object.assign(query, { params })
  }

  if (method === 'post' || method === 'put' || method === 'patch') {
    Object.assign(query, body)
  }

  const axiosResponse = await api[method](url, query)

  return {
    code: axiosResponse.status,
    data: axiosResponse.data,
  }
}
