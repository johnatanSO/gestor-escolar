import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../repositories/Subjects/ISubjectsRepository'
import { ISubject } from '../../entities/subject'

interface IRequest {
  idTeacher: string
}

@injectable()
export class ListAllSubjectsService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute({ idTeacher }: IRequest): Promise<ISubject[]> {
    return await this.subjectsRepository.list({ idTeacher })
  }
}
