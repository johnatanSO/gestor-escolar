import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { AppError } from '../../../shared/errors/AppError'
import { IGradesRepository } from '../../../repositories/Grades/IGradesRepository'

interface IRequest {
  studentsIds: string[]
  idSubject: string
}

@injectable()
export class InsertStudentsInSubjectService {
  subjectsRepository: ISubjectsRepository
  gradesRepository: IGradesRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
    @inject('GradesRepository') gradesRepository: IGradesRepository,
  ) {
    this.subjectsRepository = subjectsRepository
    this.gradesRepository = gradesRepository
  }

  async execute({ studentsIds, idSubject }: IRequest): Promise<void> {
    if (!idSubject) throw new AppError('_id da disciplina não foi informado')

    const fields = {
      students: studentsIds,
    }

    await this.subjectsRepository.update({ idSubject, fields })

    studentsIds.forEach(async (idStudent) => {
      await this.gradesRepository.create({
        idStudent,
        idSubject,
        firstGrade: 0,
        secondGrade: 0,
      })
    })
  }
}
