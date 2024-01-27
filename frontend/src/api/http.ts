import axios from 'axios'
import { tokenService } from '../services/tokenService'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

http.interceptors.request.use(
  (config: any) => {
    const token = tokenService.getToken()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
