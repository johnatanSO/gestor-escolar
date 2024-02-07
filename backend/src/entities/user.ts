import mongoose, { Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  code: string
  name: string
  email: string
  password: string
  occupation: string
  avatar: string
  avatarURL: string
  teacher: Types.ObjectId | User
  createdAt: Date
  warningsAmount: number
}

const userSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null, required: true },
  email: { type: String, default: null, required: true },
  password: { type: String, default: null, required: true },
  occupation: { type: String, default: null, required: true },
  avatar: { type: String, default: null },
  avatarURL: { type: String, default: null },
  teacher: { type: 'ObjectId', ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
  warningsAmount: { type: Number, default: 0 },
})

export const UserModel = mongoose.model<User>('User', userSchema)
