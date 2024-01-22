import mongoose, { Types } from 'mongoose'

export interface ISubject {
  _id: Types.ObjectId
  code?: string
  name: string
  students: Types.ObjectId[]
}

const subjectSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null, required: true },
  students: [{ type: 'ObjectId', ref: 'Student', default: null }],
  teacher: { type: 'ObjectId', ref: 'User', default: null },
})

export const SubjectModel = mongoose.model<ISubject>('Subject', subjectSchema)
