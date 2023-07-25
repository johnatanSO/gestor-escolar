import { Types } from 'mongoose'

export interface NewSubject {
  name: string
}

export interface Subject {
  name: string
  students: Types.ObjectId
}

export interface InsertStudentParams {
  studentsIds: string[]
  subjectId: string
}

export interface ISubjectsRepository {
  list: () => Promise<Subject[]>
  create: (newSubjectData: NewSubject) => Promise<NewSubject>
  insertStudent: (insertStudentParams: InsertStudentParams) => void
}
