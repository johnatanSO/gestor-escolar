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
  async getSession(ctx = null) {
    const token = this.getToken(ctx)

    if (!token) return false

    return await this.verifyToken(token)
  },

  async verifyToken(token: String) {
    return true
    // Implementar verificação de token com o back-end
    // return token
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

  getToken(ctx = null) {
    const cookies = nookies.get(ctx)
    return cookies ? cookies[ACCESS_TOKEN_KEY] : null
  },

  async saveUser(userResponse: any) {
    globalThis?.localStorage?.setItem(
      USER_INFO,
      JSON.stringify(userResponse.item),
    )
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, userResponse?.token)
    setCookie(undefined, ACCESS_TOKEN_KEY, userResponse?.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    setCookie(undefined, USER_INFO, JSON.stringify(userResponse.item), {
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
    console.log('cokkies', cookies[USER_INFO])
    return cookies[USER_INFO] ? JSON.parse(cookies[USER_INFO]) : null
  },

  async checkPermission(context = null) {
    const userInfo = usersService.getUserInfoByCookie(context)
    const isStudent = userInfo?.occupation === 'student'
    const isTeacher = userInfo?.occupation === 'teacher'

    if (isTeacher) {
      return {
        redirect: {
          permanent: false,
          destination: '/teacher',
        },
        props: {},
      }
    }

    if (isStudent) {
      return {
        redirect: {
          permanent: false,
          destination: '/student',
        },
        props: {},
      }
    }
  },
}
