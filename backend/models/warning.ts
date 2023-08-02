import mongoose from 'mongoose'

const warningSchema = new mongoose.Schema({
  code: { type: String, default: null },
  uniqueId: { type: String, default: Math.random() * 879865489 },
  title: { type: String, default: null, required: true },
  description: { type: String, default: null },
  studentId: { type: String, default: null },
  date: { type: Date, default: new Date() },
})

export const WarningModel = mongoose.model('Warning', warningSchema)
