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

export interface UpdateGradesParams {
  studentsIds: string[]
  subjectId: string
  grades: {
    firstGrade: number
    secondGrade: number
  }
}

export interface IStudentsRepository {
  list: (queryList: any) => Promise<Student[]>
  create: (newStudentData: NewStudent) => void
  getEntries: () => Promise<number>
  updateGrades: (updateGradesParams: UpdateGradesParams) => Promise<any>
}
