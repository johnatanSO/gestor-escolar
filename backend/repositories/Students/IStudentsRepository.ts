import { Types } from 'mongoose'

export interface Student {
  _id: Types.ObjectId
  name: string
  subjects: string[]
}

export interface NewStudent {
  name: string
  code: string
}

export interface IStudentsRepository {
  list: () => Promise<Student[]>
  create: (newStudentData: NewStudent) => void
  getEntries: () => Promise<number>
}
