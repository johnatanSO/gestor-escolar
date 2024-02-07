import mongoose, { Types } from 'mongoose'
import { User } from './user'

export interface ISubject {
  _id: Types.ObjectId
  code: string
  name: string
  students: Types.ObjectId[] | User[]
  teacher: Types.ObjectId | User
  createdAt: Date
}

const subjectSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null, required: true },
  students: [{ type: 'ObjectId', ref: 'User', default: null }],
  teacher: { type: 'ObjectId', ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
})

export const SubjectModel = mongoose.model<ISubject>('Subject', subjectSchema)
