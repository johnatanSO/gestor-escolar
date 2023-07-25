import { Types } from 'mongoose'

export interface Student {
  _id: Types.ObjectId
  name: string
  subjects: string[]
}

export interface IStudentsRepository {
  list: () => Promise<Student[]>
  create: (name: string) => void
}
