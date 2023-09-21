import { inject, injectable } from 'tsyringe'
import { Warning } from '../../../entities/warning'
import { AppError } from '../../../errors/AppError'
import { IWarningsRepository } from '../../../repositories/Warnings/IWarningsRepository'

@injectable()
export class ListWarningsService {
  warningsRepository: IWarningsRepository
  constructor(
    @inject('WarningsRepository') warningsRepository: IWarningsRepository,
  ) {
    this.warningsRepository = warningsRepository
  }

  async execute(idStudent: string): Promise<Warning[]> {
    if (!idStudent) throw new AppError('_id do aluno não informado')

    const warnings = await this.warningsRepository.list(idStudent)

    return warnings
  }
}
