import {
  IWarningsRepository,
  INewWarningDTO,
} from '../../../repositories/Warnings/IWarningsRepository'
import { inject, injectable } from 'tsyringe'
import { Warning } from '../../../entities/warning'
import { AppError } from '../../../shared/errors/AppError'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'

@injectable()
export class CreateNewWarningService {
  warningsRepository: IWarningsRepository
  usersRepository: IUsersRepository
  constructor(
    @inject('WarningsRepository') warningsRepository: IWarningsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.warningsRepository = warningsRepository
    this.usersRepository = usersRepository
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

    await this.usersRepository.incrementWarningsAmount(idStudent)

    return newWarning
  }
}
