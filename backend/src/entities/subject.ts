import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null, required: true },
  students: { type: Array, default: null },
})

export const SubjectModel = mongoose.model('Subject', subjectSchema)
