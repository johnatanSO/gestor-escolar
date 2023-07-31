import { StudentModel } from '../../models/student'
import {
  IStudentsRepository,
  NewStudent,
  UpdateGradesParams,
} from './IStudentsRepository'

export class StudentsRepository implements IStudentsRepository {
  async list(): Promise<any[]> {
    const students = await StudentModel.find()
    return students
  }

  async getEntries(): Promise<number> {
    return await StudentModel.countDocuments()
  }

  async create(newStudentData: NewStudent) {
    const newStudent = new StudentModel(newStudentData)
    await newStudent.save()
  }

  async updateGrades({ studentsIds, subjectId, grades }: UpdateGradesParams) {
    studentsIds.forEach((studentId) => {
      StudentModel.updateMany(
        { _id: studentId, grades: { $elemMatch: { _id: subjectId } } },
        {
          $set: {
            'grades.$.firstGrade': grades?.firstGrade,
            'grades.$.secondGrade': grades?.secondGrade,
            'grades.$.totalGrade': grades?.firstGrade + grades?.secondGrade,
          },
        },
      )
    })
  }
}
