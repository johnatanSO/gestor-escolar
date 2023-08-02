import { Types } from 'mongoose'

export interface NewWarning {
  code?: string
  title: string
  description: string
  studentId: string
}

export interface Warning {
  code: string
  uniqueId: string
  title: string
  description: string
  studentId: string
  date: Date
}

export interface IWarningsRepository {
  list: () => Promise<Warning[]>
  create: (newSubjectData: NewWarning) => Promise<any>
  findById: (idSubject: string | Types.ObjectId) => Promise<Warning | null>
  getEntries: () => Promise<number>
}
