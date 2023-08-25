import { Warning } from '../repositories/Warnings/IWarningsRepository'
import { WarningsRepository } from '../repositories/Warnings/WarningsRepository'

export class ListWarningsService {
  warningsRepository: WarningsRepository
  constructor(warningsRepository: WarningsRepository) {
    this.warningsRepository = warningsRepository
  }

  async execute(idStudent: string): Promise<Warning[]> {
    return await this.warningsRepository.list(idStudent)
  }
}
