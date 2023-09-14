import { Types } from 'mongoose'
import { Warning } from '../../entities/warning'

export interface INewWarningDTO {
  code?: string
  title: string
  description: string
  idStudent: string
}

export interface IWarningsRepository {
  list: (idStudent?: string) => Promise<Warning[]>
  create: (newWarningData: INewWarningDTO) => Promise<any>
  findById: (idSubject: string | Types.ObjectId) => Promise<Warning | null>
  getEntries: (idStudent: string) => Promise<number>
}
