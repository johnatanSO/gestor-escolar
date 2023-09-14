import {
  IWarningsRepository,
  INewWarningDTO,
} from '../../repositories/Warnings/IWarningsRepository'
import { IStudentsRepository } from '../../repositories/Students/IStudentsRepository'
import { inject, injectable } from 'tsyringe'
import { Warning } from '../../entities/warning'

@injectable()
export class CreateNewWarningService {
  warningsRepository: IWarningsRepository
  studentsRepository: IStudentsRepository
  constructor(
    @inject('WarningsRepository') warningsRepository: IWarningsRepository,
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.warningsRepository = warningsRepository
    this.studentsRepository = studentsRepository
  }

  async execute({
    idStudent,
    title,
    description,
  }: INewWarningDTO): Promise<Warning> {
    if (!title) {
      throw new Error('Título não foi informado')
    }

    const entries = await this.warningsRepository.getEntries(idStudent)
    const code = (entries + 1).toString()

    const newWarning = await this.warningsRepository.create({
      code,
      idStudent,
      title,
      description,
    })

    return newWarning
  }
}
