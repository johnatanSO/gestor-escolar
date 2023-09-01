import { Types } from 'mongoose'

export interface NewUser {
  name: string
  email: string
  password: string
  occupation: string
  _id?: string | Types.ObjectId
}

export interface User {
  email: string
  password: string
  _id?: string | Types.ObjectId
}

export interface IUsersRepository {
  create: (newUserData: NewUser) => Promise<NewUser>
  findByEmail: (email: string) => Promise<NewUser>
  authenticate: (email: string) => Promise<User>
  checkToken: (token: string) => Promise<any>
}
