import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from './../../../repositories/Subjects/ISubjectsRepository'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class DeleteSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute(idSubject: string): Promise<void> {
    if (!idSubject) throw new AppError('_id da disciplina não foi informado')

    const subject = await this.subjectsRepository.findById(idSubject)

    if (!subject) throw new AppError('Disciplina não encontrada')

    await this.subjectsRepository.delete(subject._id.toString())
  }
}
