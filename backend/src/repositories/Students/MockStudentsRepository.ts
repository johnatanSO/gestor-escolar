import { IStudent } from '../../entities/student'
import {
  INewStudentDTO,
  IStudentsRepository,
  IUpdateGradesDTO,
  IUpdateStudentDTO,
} from './IStudentsRepository'

export class MockStudentsRepository implements IStudentsRepository {
  students: IStudent[] = []

  async list(queryList: any): Promise<IStudent[]> {
    return this.students
  }

  async create(newStudentData: INewStudentDTO): Promise<IStudent> {
    const newStudent = {
      ...newStudentData,
      absences: null,
      grades: null,
      warningsAmount: 0,
    }

    this.students.push(newStudent)

    return newStudent
  }

  async getEntries(): Promise<number> {
    return this.students.length
  }

  async updateGrades({
    studentsIds,
    subjectId,
    grades,
  }: IUpdateGradesDTO): Promise<void> {
    const { firstGrade, secondGrade } = grades

    studentsIds.forEach((studentId) => {
      const gradesToUpdate = {
        _id: subjectId,
        firstGrade,
        secondGrade,
        totalGrades: (firstGrade + secondGrade) / 2,
      }

      this.students.forEach((student) => {
        if (student?._id?.toString() === studentId) {
          const gradeAlreadyExist = student?.grades?.find(
            (grade) => grade._id === subjectId,
          )
          if (gradeAlreadyExist) {
            student.grades.forEach((grade) => {
              if (grade._id === subjectId) grade = gradesToUpdate
            })
          } else {
            student.grades = [gradesToUpdate]
          }
        }
      })
    })
  }

  async update(updateParams: IUpdateStudentDTO): Promise<void> {}

  async findById(idStudent: string): Promise<IStudent> {
    return this.students.find((student) => student._id.toString() === idStudent)
  }
}
