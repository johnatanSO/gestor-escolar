import nookies from 'nookies'
const ACCESS_TOKEN_KEY = 'access:gestor-escolar'

export const tokenService = {
  saveToken(token: string) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, token)
    nookies.set(null, ACCESS_TOKEN_KEY, token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  getToken(ctx = null) {
    const cookies = nookies.get(ctx)
    return cookies ? cookies[ACCESS_TOKEN_KEY] : null
  },

  async deleteToken() {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)
    nookies.destroy(null, ACCESS_TOKEN_KEY)
  },

  async getSession(ctx = null) {
    const token = this.getToken(ctx)

    if (!token) return false

    return true
  },
}