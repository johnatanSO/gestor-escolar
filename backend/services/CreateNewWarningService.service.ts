import {
  IWarningsRepository,
  NewWarning,
  Warning,
} from '../repositories/Warnings/IWarningsRepository'
import { IStudentsRepository } from '../repositories/Students/IStudentsRepository'

export class CreateNewWarningService {
  warningsRepository: IWarningsRepository
  studentsRepository: IStudentsRepository
  constructor(
    warningsRepository: IWarningsRepository,
    studentsRepository: IStudentsRepository,
  ) {
    this.warningsRepository = warningsRepository
    this.studentsRepository = studentsRepository
  }

  async execute({
    idStudent,
    title,
    description,
  }: NewWarning): Promise<Warning> {
    if (!title) {
      throw new Error('Título não foi informado')
    }

    const entries = await this.warningsRepository.getEntries(idStudent)
    const code: string = (entries + 1).toString()

    const newWarning = await this.warningsRepository.create({
      code,
      idStudent,
      title,
      description,
    })
    this.studentsRepository.updateWarningsAmount(idStudent)
    return newWarning
  }
}
