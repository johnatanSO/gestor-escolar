import { Types } from 'mongoose'
import { IStudent } from '../../entities/student'

export interface INewStudentDTO {
  _id: Types.ObjectId
  code: string
  name: string
  idTeacher: string
}

export interface IUpdateGradesDTO {
  studentsIds: string[]
  subjectId: string
  grades: {
    firstGrade: number
    secondGrade: number
  }
}

export interface IUpdateStudentDTO {
  filters: any
  updateFields: any
}

export interface IStudentsRepository {
  list: (queryList: any) => Promise<IStudent[]>
  create: (newStudentData: INewStudentDTO) => Promise<IStudent>
  getEntries: (idTeacher: string) => Promise<number>
  updateGrades: (updateGradesParams: IUpdateGradesDTO) => Promise<void>
  update: (updateParams: IUpdateStudentDTO) => Promise<void>
  findById: (idStudent: string) => Promise<IStudent>
  delete: (studentId: string) => Promise<void>
}
