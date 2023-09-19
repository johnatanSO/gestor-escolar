import mongoose, { Types } from 'mongoose'

export interface IStudent {
  _id: Types.ObjectId
  code: string
  user: any
  absences: any[]
  grades: any[]
  warningsAmount: number
  idTeacher: Types.ObjectId | string
}

const studentSchema = new mongoose.Schema({
  code: { type: String, default: null },
  user: { type: 'ObjectId', ref: 'User', default: null },
  absences: { type: Array, default: null },
  grades: { type: Array, default: null },
  warningsAmount: { type: Number, default: 0 },
  idTeacher: { type: 'ObjectId', ref: 'User', default: null },
})

export const StudentModel = mongoose.model<IStudent>('Student', studentSchema)
