import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { ISubject } from '../../../entities/subject'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  name: string
  idTeacher: string
}

@injectable()
export class CreateNewSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.subjectsRepository = subjectsRepository
  }

  async execute({ name, idTeacher }: IRequest): Promise<ISubject> {
    if (!name) throw new AppError('O nome da disciplina não foi informado.')
    if (!idTeacher) throw new AppError('_id do professor não foi informado')

    const entries = await this.subjectsRepository.getEntries({ idTeacher })
    const code: string = (entries + 1).toString()

    const newSubject = await this.subjectsRepository.create({
      code,
      name,
      idTeacher,
    })
    return newSubject
  }
}
