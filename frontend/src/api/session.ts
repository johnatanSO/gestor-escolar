import http from './http'

export const session = {
  async verifyToken(token: string) {
    const res = await http.get('/users/verify_token/' + token)
    if (!res.data.token) return false
    return true
  },
}
