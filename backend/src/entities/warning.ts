import mongoose, { Types } from 'mongoose'

export interface Warning {
  _id: Types.ObjectId | string
  code: string
  title: string
  description: string
  student: Types.ObjectId
  date: Date
}

const warningSchema = new mongoose.Schema({
  code: { type: String, default: null },
  title: { type: String, default: null, required: true },
  description: { type: String, default: null },
  student: { type: 'ObjectId', ref: 'Student', default: null },
  date: { type: Date, default: Date.now },
})

export const WarningModel = mongoose.model<Warning>('Warning', warningSchema)
