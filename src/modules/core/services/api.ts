import axios from 'axios'

console.log('API URL:', import.meta.env.VITE_API_URL)

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
})

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tabRank:accessToken')
      localStorage.removeItem('tabRank:user')

      window.location.href = '/'
    }

    return Promise.reject(error)
  },
)
