import { UpdateWarningsAmount } from '../Student/UpdateWarningsAmount/UpdateWarningsAmount.service'
import {
  IWarningsRepository,
  INewWarningDTO,
} from '../../repositories/Warnings/IWarningsRepository'
import { container, inject, injectable } from 'tsyringe'
import { Warning } from '../../entities/warning'

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

    const updateWarningsAmount = container.resolve(UpdateWarningsAmount)
    await updateWarningsAmount.execute(idStudent)

    return newWarning
  }
}
