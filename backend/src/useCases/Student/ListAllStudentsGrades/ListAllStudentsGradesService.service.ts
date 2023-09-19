import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { IStudentsRepository } from '../../../repositories/Students/IStudentsRepository'
import { AppError } from '../../../errors/AppError'

interface IResponse {
  code: string
  name: string
  grades: {
    firstGrade: number
    secondGrade: number
    totalGrades: number
  }
}

@injectable()
export class ListAllStudentsGradesService {
  subjectsRepository: ISubjectsRepository
  studentsRepository: IStudentsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
    this.studentsRepository = studentsRepository
  }

  async execute(idSubject: string): Promise<IResponse[]> {
    if (!idSubject) throw new AppError('_id da disciplina não foi informado')

    const subject = await this.subjectsRepository.findById(idSubject)
    const queryList = {
      _id: { $in: subject?.students },
    }

    if (!subject) throw new AppError('Disciplina não encontrada')

    const students = await this.studentsRepository.list(queryList)
    const studentsGradesFormated = students.map((student) => {
      const grades = student?.grades?.find((grade) => grade?._id === idSubject)

      console.log('Student', student)

      return {
        code: student.code,
        name: student.user.name,
        grades,
      }
    })

    return studentsGradesFormated
  }
}
