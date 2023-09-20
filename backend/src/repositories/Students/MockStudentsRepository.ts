import { IStudent } from '../../entities/student'
import {
  INewStudentDTO,
  IStudentsRepository,
  IUpdateGradesDTO,
  IUpdateStudentDTO,
} from './IStudentsRepository'
import { IUsersRepository } from '../Users/IUsersRepository'

export class MockStudentsRepository implements IStudentsRepository {
  students: IStudent[] = []
  mockUsersRepository: IUsersRepository
  constructor(mockUsersRepository: IUsersRepository) {
    this.mockUsersRepository = mockUsersRepository
  }

  async list(queryList: any): Promise<IStudent[]> {
    const students = await Promise.all(
      this.students.map(async (student) => {
        const userData = await this.mockUsersRepository.findById(
          student.user.toString(),
        )

        student.user = userData

        return student
      }),
    )

    return students
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

  async update({ filters, updateFields }: IUpdateStudentDTO): Promise<void> {
    const indexStudentToUpdate = this.students.findIndex(
      (student) => student._id.toString() === filters.idStudent.toString(),
    )

    if (indexStudentToUpdate !== -1) {
      this.students[indexStudentToUpdate] = {
        ...this.students[indexStudentToUpdate],
        warningsAmount: this.students[indexStudentToUpdate].warningsAmount + 1,
      }
    }
  }

  async findById(idStudent: string): Promise<IStudent> {
    const student = this.students.find(
      (student) => student._id.toString() === idStudent,
    )

    if (student) {
      student.user = await this.mockUsersRepository.findById(
        student.user.toString(),
      )
    }

    return student
  }

  async delete(studentId: string): Promise<void> {
    this.students = this.students.filter(
      (student) => student._id.toString() !== studentId,
    )
  }
}
