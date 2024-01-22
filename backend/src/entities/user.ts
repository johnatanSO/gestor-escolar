import mongoose, { Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  code: string
  name: string
  email: string
  password: string
  occupation: string
  avatar: string
  teacher: Types.ObjectId
  grades: Types.ObjectId
  subjects: Types.ObjectId
  warnings: Types.ObjectId
}

const userSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null, required: true },
  email: { type: String, default: null, required: true },
  password: { type: String, default: null, required: true },
  occupation: { type: String, default: null, required: true },
  avatar: { type: String, default: null },
  teacher: { type: 'ObjectId', ref: 'User', default: null },
  grades: [{ type: 'ObjectId', ref: 'Grade', default: null }],
  subjects: [{ type: 'ObjectId', ref: 'Subject', default: null }],
  warnings: [{ type: 'ObjectId', ref: 'Warning', default: null }],
})

export const UserModel = mongoose.model<User>('User', userSchema)
