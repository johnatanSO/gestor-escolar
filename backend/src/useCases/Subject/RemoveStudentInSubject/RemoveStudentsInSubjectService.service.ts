import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { AppError } from '../../../shared/errors/AppError'
import { IGradesRepository } from '../../../repositories/Grades/IGradesRepository'

interface IRequest {
  studentsIds: string[]
  idSubject: string
}

@injectable()
export class RemoveStudentsInSubjectService {
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

    await this.subjectsRepository.removeStudents(idSubject, studentsIds)

    studentsIds.forEach(async (idStudent) => {
      const grade = await this.gradesRepository.listBySubjectAndStudent(
        idStudent,
        idSubject,
      )
      await this.gradesRepository.delete(grade._id.toString())
    })
  }
}
