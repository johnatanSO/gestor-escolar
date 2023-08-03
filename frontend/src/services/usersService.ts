import { NextRequest } from 'next/server'
import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'
import { LoginUserData } from '../screens/Login'
import nookies, { setCookie, destroyCookie } from 'nookies'

const USER_INFO = 'userInfo:gestor-escolar'
const ACCESS_TOKEN_KEY = ':gestor-escolar[v1]:'

interface LoginParams {
  userData: LoginUserData
}

interface RegisterParams {
  newUser: NewUser
}

export const usersService = {
  async getSession(request: NextRequest) {
    const token: string | undefined = await this.getToken(request)

    if (!token) return false

    return await this.verifyToken(token)
  },

  async verifyToken(token: String) {
    return token
  },

  async login({ userData }: LoginParams) {
    const body: any = { ...userData }

    return http.post('/users/login', {
      ...body,
    })
  },

  async register({ newUser }: RegisterParams) {
    const body = { ...newUser }

    return http.post('/users/register', {
      ...body,
    })
  },

  async getToken(request: NextRequest) {
    const token: string | undefined = request.cookies.get(ACCESS_TOKEN_KEY)

    return token || undefined
  },

  async saveUser(userData: any) {
    globalThis?.localStorage?.setItem(USER_INFO, JSON.stringify(userData))
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, userData?._id)
    setCookie(undefined, ACCESS_TOKEN_KEY, userData?._id, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    setCookie(undefined, USER_INFO, JSON.stringify(userData), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  async deleteToken() {
    globalThis?.localStorage?.removeItem(USER_INFO)
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)
    destroyCookie(null, ACCESS_TOKEN_KEY)
    destroyCookie(null, USER_INFO)
  },

  getUserInfo() {
    return JSON.parse(globalThis?.localStorage?.getItem(USER_INFO) || '{}')
  },

  getUserInfoByCookie(context = null) {
    const cookies = nookies.get(context)
    return cookies ? JSON.parse(cookies[USER_INFO]) : null
  },
}
