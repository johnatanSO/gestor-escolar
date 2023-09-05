import { inject, injectable } from 'tsyringe'
import {
  ISubjectsRepository,
  Subject,
} from '../../repositories/Subjects/ISubjectsRepository'

@injectable()
export class ListAllSubjectsService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute(): Promise<Subject[]> {
    return await this.subjectsRepository.list({})
  }
}
