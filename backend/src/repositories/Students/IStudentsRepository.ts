import { Types } from 'mongoose'
import { IStudent } from '../../entities/student'

export interface NewStudent {
  name: string
  code: string
  _id: Types.ObjectId | string
}

export interface UpdateGradesParams {
  studentsIds: string[]
  subjectId: string
  grades: {
    firstGrade: number
    secondGrade: number
  }
}

export interface IStudentsRepository {
  list: (queryList: any) => Promise<IStudent[]>
  create: (newStudentData: NewStudent) => void
  getEntries: () => Promise<number>
  updateGrades: (updateGradesParams: UpdateGradesParams) => Promise<any>
  updateWarningsAmount: (idStudent: string) => void
  findById: (idStudent: string) => Promise<IStudent>
}
