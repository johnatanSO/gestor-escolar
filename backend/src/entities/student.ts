import mongoose, { Types } from 'mongoose'

export interface IStudent {
  _id: Types.ObjectId
  code: string
  name: string
  absences: any[]
  grades: any[]
  warningsAmount: number
}

const studentSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null },
  absences: { type: Array, default: null },
  grades: { type: Array, default: null },
  warningsAmount: { type: Number, default: 0 },
})

export const StudentModel = mongoose.model<IStudent>('Student', studentSchema)
