import mongoose, { Types } from 'mongoose'

export interface Grade {
  _id: Types.ObjectId
  student: Types.ObjectId
  subject: Types.ObjectId
  firstGrade: number
  secondGrade: number
  createdAt: Date
}

const gradeSchema = new mongoose.Schema({
  code: { type: String, default: null },
  student: { type: 'ObjectId', ref: 'Student', default: null },
  subject: { type: 'ObjectId', ref: 'Subject', default: null },
  firstGrade: { type: Number, default: 0 },
  secondGrade: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export const GradeModel = mongoose.model<Grade>('Grade', gradeSchema)
