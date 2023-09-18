import mongoose, { Types } from 'mongoose'

export interface Warning {
  _id: Types.ObjectId
  code: string
  title: string
  description: string
  idStudent: Types.ObjectId
  date: Date
}

const warningSchema = new mongoose.Schema({
  code: { type: String, default: null },
  title: { type: String, default: null, required: true },
  description: { type: String, default: null },
  idStudent: { type: 'ObjectId', ref: 'Student', default: null },
  date: { type: Date, default: new Date() },
})

export const WarningModel = mongoose.model<Warning>('Warning', warningSchema)
