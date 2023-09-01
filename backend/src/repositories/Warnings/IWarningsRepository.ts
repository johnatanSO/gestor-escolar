import { Types } from 'mongoose'

export interface NewWarning {
  code?: string
  title: string
  description: string
  idStudent: string
}

export interface Warning {
  code: string
  uniqueId: string
  title: string
  description: string
  idStudent: string
  date: Date
}

export interface IWarningsRepository {
  list: (idStudent?: string) => Promise<Warning[]>
  create: (newSubjectData: NewWarning) => Promise<any>
  findById: (idSubject: string | Types.ObjectId) => Promise<Warning | null>
  getEntries: (idStudent: string) => Promise<number>
}
