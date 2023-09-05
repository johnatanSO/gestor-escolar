import { ISubjectsRepository } from './../../repositories/Subjects/ISubjectsRepository'

export class DeleteSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(subjectsRepository: ISubjectsRepository) {
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
