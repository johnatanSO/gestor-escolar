import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'
import { LoginUserData } from '../screens/Login'
import nookies from 'nookies'

const USER_INFO = 'userInfo:gestor-escolar'
const ACCESS_TOKEN_KEY = 'access:gestor-escolar'

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

    return true
  },

  async login({ userData }: LoginParams) {
    const body = { ...userData }

    return http.post('/login', {
      ...body,
    })
  },

  async register({ newUser }: RegisterParams) {
    const body = { ...newUser }

    return http.post('/users', {
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
    nookies.set(null, ACCESS_TOKEN_KEY, userResponse?.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    nookies.set(null, USER_INFO, JSON.stringify(userResponse.item), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  async deleteToken() {
    globalThis?.localStorage?.removeItem(USER_INFO)
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)
    nookies.destroy(null, ACCESS_TOKEN_KEY)
    nookies.destroy(null, USER_INFO)
  },

  getUserInfo() {
    return JSON.parse(globalThis?.localStorage?.getItem(USER_INFO) || '{}')
  },

  getUserInfoByCookie(context = null) {
    const cookies = nookies.get(context)
    return cookies[USER_INFO] ? JSON.parse(cookies[USER_INFO]) : null
  },

  checkPermission(context = null) {
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

  async updateAvatarImage({ avatarImage }: any) {
    const formData = new FormData()

    formData.append('avatar', avatarImage)

    return await http.patch('/users/avatar', formData)
  },

  async getCurrentUserInfo() {
    return await http.get('/users/' + this.getUserInfo()._id)
  },
}
