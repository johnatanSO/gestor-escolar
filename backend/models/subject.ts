import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  name: { type: String, default: null },
  students: { type: Array, default: null },
})

export const SubjectModel = mongoose.model('Subject', subjectSchema)
