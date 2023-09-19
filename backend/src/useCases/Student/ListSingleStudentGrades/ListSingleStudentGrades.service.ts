import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { AppError } from '../../../errors/AppError'

interface IResponse {
  subjectGrades: {
    firstGrade: number
    secondGrade: number
    totalGrades: number
  }
  subjectName: string
  subjectCode: string
}

@injectable()
export class ListSingleStudentGrades {
  subjectsRepository: ISubjectsRepository
  studentsRepository: IStudentsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
    this.studentsRepository = studentsRepository
  }

  async execute(idStudent: string): Promise<IResponse[]> {
    if (!idStudent) throw new AppError('_id do aluno não informado')

    const student = await this.studentsRepository.findById(idStudent)

    if (!student) throw new AppError('Aluno não encontrado ')

    const queryListSubjects = {
      students: { $elemMatch: { $eq: idStudent } },
    }

    const subjects = await this.subjectsRepository.list(queryListSubjects)
    const studentGrades = subjects.map((subject) => {
      const subjectGrades = student.grades.find(
        (grade) => grade._id === subject._id.toString(),
      )
      return {
        subjectGrades,
        subjectName: subject.name,
        subjectCode: subject.code,
      }
    })

    return studentGrades
  }
}
