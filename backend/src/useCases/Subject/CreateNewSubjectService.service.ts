import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../repositories/Subjects/ISubjectsRepository'
import { ISubject } from '../../entities/subject'

interface IRequest {
  name: string
}

@injectable()
export class CreateNewSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute({ name }: IRequest): Promise<ISubject> {
    if (!name) {
      throw new Error('O nome da disciplina não foi informado.')
    }

    const entries = await this.subjectsRepository.getEntries()
    const code: string = (entries + 1).toString()

    const newSubject = await this.subjectsRepository.create({ code, name })
    return newSubject
  }
}
