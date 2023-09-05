import { Types } from 'mongoose'

export interface NewSubject {
  name: string
  code?: string
}

export interface Subject {
  _id?: Types.ObjectId
  code?: string
  name: string
  students?: string[]
}

export interface InsertStudentParams {
  studentsIds: string[]
  subjectId: string
}

export interface ISubjectsRepository {
  list: (query: any) => Promise<Subject[]>
  create: (newSubjectData: NewSubject) => Promise<any>
  findById: (idSubject: string | Types.ObjectId) => Promise<Subject | null>
  delete: (idSubject: string) => void
  insertStudent: (insertStudentParams: InsertStudentParams) => void
  getEntries: () => Promise<number>
}
