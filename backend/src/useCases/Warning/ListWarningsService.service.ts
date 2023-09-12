import { inject, injectable } from 'tsyringe'
import { Warning } from '../../repositories/Warnings/IWarningsRepository'
import { WarningsRepository } from '../../repositories/Warnings/WarningsRepository'

@injectable()
export class ListWarningsService {
  warningsRepository: WarningsRepository
  constructor(
    @inject('SarningsRepository') warningsRepository: WarningsRepository,
  ) {
    this.warningsRepository = warningsRepository
  }

  async execute(idStudent: string): Promise<Warning[]> {
    const warnings = await this.warningsRepository.list(idStudent)
    return warnings
  }
}
