import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from './../../repositories/Subjects/ISubjectsRepository'
import { AppError } from '../../errors/AppError'

@injectable()
export class DeleteSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute(idSubject: string): Promise<void> {
    const subjectNotFound = await this.subjectsRepository.findById(idSubject)

    if (!subjectNotFound) {
      throw new AppError('Disciplina não encontrada')
    }
    await this.subjectsRepository.delete(idSubject)
  }
}
