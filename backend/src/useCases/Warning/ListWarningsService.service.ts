import { inject, injectable } from 'tsyringe'
import { WarningsRepository } from '../../repositories/Warnings/WarningsRepository'
import { Warning } from '../../entities/warning'

@injectable()
export class ListWarningsService {
  warningsRepository: WarningsRepository
  constructor(
    @inject('WarningsRepository') warningsRepository: WarningsRepository,
  ) {
    this.warningsRepository = warningsRepository
  }

  async execute(idStudent: string): Promise<Warning[]> {
    const warnings = await this.warningsRepository.list(idStudent)
    return warnings
  }
}
