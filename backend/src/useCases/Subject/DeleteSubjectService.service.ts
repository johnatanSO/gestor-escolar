import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from './../../repositories/Subjects/ISubjectsRepository'

@injectable()
export class DeleteSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute(idSubject: string) {
    const subjectNotFound = await this.subjectsRepository.findById(idSubject)

    if (!subjectNotFound) {
      throw new Error('Disciplina não encontrada')
    }
    this.subjectsRepository.delete(idSubject)
  }
}
