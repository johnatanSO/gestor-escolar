import {
  IWarningsRepository,
  NewWarning,
  Warning,
} from '../repositories/Warnings/IWarningsRepository'

export class CreateNewWarningService {
  warningsRepository: IWarningsRepository
  constructor(studentsRepository: IWarningsRepository) {
    this.warningsRepository = studentsRepository
  }

  async execute({
    studentId,
    title,
    description,
  }: NewWarning): Promise<Warning> {
    if (!title) {
      throw new Error('Título não foi informado')
    }

    const entries = await this.warningsRepository.getEntries()
    const code: string = (entries + 1).toString()

    const newWarning = await this.warningsRepository.create({
      code,
      studentId,
      title,
      description,
    })
    return newWarning
  }
}
