import { IStudent, StudentModel } from '../../entities/student'
import {
  INewStudentDTO,
  IStudentsRepository,
  IUpdateGradesDTO,
  IUpdateStudentDTO,
} from './IStudentsRepository'

export class StudentsRepository implements IStudentsRepository {
  model: typeof StudentModel
  constructor() {
    this.model = StudentModel
  }

  async list(queryList?: any): Promise<IStudent[]> {
    const students = await this.model.find(queryList || {})
    return students
  }

  async getEntries(idTeacher: string): Promise<number> {
    return await this.model.countDocuments({ idTeacher })
  }

  async create(newStudentData: INewStudentDTO): Promise<IStudent> {
    const newStudent = await this.model.create(newStudentData)
    await newStudent.save()

    return newStudent
  }

  async updateGrades({ studentsIds, subjectId, grades }: IUpdateGradesDTO) {
    const { firstGrade, secondGrade } = grades

    const promisesToUpdate = studentsIds.map(async (studentId) => {
      const gradesToUpdate = {
        _id: subjectId,
        firstGrade,
        secondGrade,
        totalGrades: (firstGrade + secondGrade) / 2,
      }

      const student = await this.model.findOne({ _id: studentId })

      const gradeAreadyExist = student?.grades?.find(
        (grade) => grade?._id === subjectId,
      )

      if (gradeAreadyExist) {
        return this.model.updateMany(
          { _id: studentId, grades: { $elemMatch: { _id: subjectId } } },
          {
            $set: {
              'grades.$': gradesToUpdate,
            },
          },
        )
      }

      return this.model.updateMany(
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

  async update({ filters, updateFields }: IUpdateStudentDTO): Promise<void> {
    await this.model.updateOne(filters, updateFields)
  }

  async findById(idStudent: string): Promise<IStudent> {
    return await StudentModel.findOne({ _id: idStudent })
  }

  async delete(studentId: string): Promise<void> {
    await this.model.deleteOne({ _id: studentId })
  }
}
