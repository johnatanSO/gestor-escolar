import { SubjectsRepository } from './../repositories/Subjects/SubjectsRepository'
import { Subject } from '../repositories/Subjects/ISubjectsRepository'

export class ListAllSubjectsService {
  subjectsRepository: SubjectsRepository
  constructor(subjectsRepository: SubjectsRepository) {
    this.subjectsRepository = subjectsRepository
  }

  async execute(): Promise<Subject[]> {
    return await this.subjectsRepository.list()
  }
}
