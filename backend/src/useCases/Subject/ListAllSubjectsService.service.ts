import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../repositories/Subjects/ISubjectsRepository'
import { ISubject } from '../../entities/subject'

@injectable()
export class ListAllSubjectsService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute(): Promise<ISubject[]> {
    return await this.subjectsRepository.list({})
  }
}
