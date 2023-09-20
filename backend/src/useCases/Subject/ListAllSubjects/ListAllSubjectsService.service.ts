import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { ISubject } from '../../../entities/subject'
import { AppError } from '../../../errors/AppError'

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
    if (!idTeacher) throw new AppError('_id do professor não foi informado.')

    return await this.subjectsRepository.list({ idTeacher })
  }
}
