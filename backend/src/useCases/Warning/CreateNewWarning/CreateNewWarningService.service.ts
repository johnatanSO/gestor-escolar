import {
  IWarningsRepository,
  INewWarningDTO,
} from '../../../repositories/Warnings/IWarningsRepository'
import { inject, injectable } from 'tsyringe'
import { Warning } from '../../../entities/warning'
import { AppError } from '../../../errors/AppError'

@injectable()
export class CreateNewWarningService {
  warningsRepository: IWarningsRepository
  constructor(
    @inject('WarningsRepository') warningsRepository: IWarningsRepository,
  ) {
    this.warningsRepository = warningsRepository
  }

  async execute({
    idStudent,
    title,
    description,
  }: INewWarningDTO): Promise<Warning> {
    if (!title) throw new AppError('Título não foi informado')
    if (!idStudent) throw new AppError('_id do aluno não foi informado')

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
