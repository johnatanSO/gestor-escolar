import { StudentModel } from '../../models/student'
import {
  IStudentsRepository,
  NewStudent,
  UpdateGradesParams,
} from './IStudentsRepository'

export class StudentsRepository implements IStudentsRepository {
  async list(queryList?: any): Promise<any[]> {
    const students = await StudentModel.find(queryList || {})
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
    const { firstGrade, secondGrade } = grades

    const promisesToUpdate = studentsIds.map(async (studentId) => {
      const gradesToUpdate = {
        _id: subjectId,
        firstGrade,
        secondGrade,
        totalGrades: (firstGrade + secondGrade) / 2,
      }

      const student = await StudentModel.findOne({ _id: studentId })

      const gradeAreadyExist = student?.grades?.find(
        (grade) => grade?._id === subjectId,
      )

      if (gradeAreadyExist) {
        return StudentModel.updateMany(
          { _id: studentId, grades: { $elemMatch: { _id: subjectId } } },
          {
            $set: {
              'grades.$': gradesToUpdate,
            },
          },
        )
      }

      return StudentModel.updateMany(
        { _id: studentId },
        {
          $push: {
            grades: gradesToUpdate,
          },
        },
      )
    })

    await Promise.all(promisesToUpdate)
  }

  async updateWarningsAmount(idStudent: string) {
    return StudentModel.updateOne(
      { _id: idStudent },
      { $inc: { warningsAmount: 1 } },
    )
  }
}
