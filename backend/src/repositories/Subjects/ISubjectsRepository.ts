import { Types } from 'mongoose'
import { ISubject } from '../../entities/subject'

export interface INewSubjectDTO {
  name: string
  code?: string
}

export interface IInsertStudentDTO {
  studentsIds: string[]
  subjectId: string
}

export interface ISubjectsRepository {
  list: (query: any) => Promise<ISubject[]>
  create: (newSubjectData: INewSubjectDTO) => Promise<ISubject>
  findById: (idSubject: string | Types.ObjectId) => Promise<ISubject>
  delete: (idSubject: string) => Promise<void>
  insertStudent: (insertStudentParams: IInsertStudentDTO) => Promise<void>
  getEntries: () => Promise<number>
}
