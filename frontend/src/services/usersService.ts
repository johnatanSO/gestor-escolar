import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'
import { LoginUserData } from '../screens/Login'
import nookies from 'nookies'

const USER_INFO = 'userInfo:gestor-escolar'


interface LoginParams {
  userData: LoginUserData
}

interface RegisterParams {
  newUser: NewUser
}

export const usersService = {
  login({ userData }: LoginParams) {
    const body = { ...userData }

    return http.post('/login', {
      ...body,
    })
  },

  register({ newUser }: RegisterParams) {
    const body = { ...newUser }

    return http.post('/users', {
      ...body,
    })
  },

  async saveUser(user: any) {
    globalThis?.localStorage?.setItem(
      USER_INFO,
      JSON.stringify(user),
    )
    nookies.set(null, USER_INFO, JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  deleteUser() {
    globalThis?.localStorage?.removeItem(USER_INFO)
    nookies.destroy(null, USER_INFO)
  },

  getUserInfo() {
    const userLocal =  JSON.parse(globalThis?.localStorage?.getItem(USER_INFO) || '{}')
    if (userLocal) return userLocal

    const cookies = nookies.get(null)
    return cookies ? cookies[USER_INFO] : null
  },

  getUserInfoByCookie(context = null) {
    const cookies = nookies.get(context)
    return cookies[USER_INFO] ? JSON.parse(cookies[USER_INFO]) : null
  },

  updateAvatarImage({ avatarImage }: any) {
    const formData = new FormData()

    formData.append('avatar', avatarImage)

    return http.patch('/users/avatar', formData)
  },
}
