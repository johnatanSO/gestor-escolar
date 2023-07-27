import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  name: { type: String, default: null },
  absences: { type: Array, default: null },
  warnings: { type: Array, default: null },
  grades: { type: Array, default: null },
})

export const StudentModel = mongoose.model('Student', studentSchema)
