import mongoose, { Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  name: string
  email: string
  occupation: string
  password: string
  avatar: string
}

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  occupation: { type: String, default: null },
  avatar: { type: String, default: null },
})

export const UserModel = mongoose.model<User>('User', userSchema)
