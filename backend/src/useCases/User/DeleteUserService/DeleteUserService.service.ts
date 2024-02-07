import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class DeleteUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(idUser: string): Promise<void> {
    if (!idUser) throw new AppError('_id do usuário não foi informado')
    const userNotFound = await this.usersRepository.findById(idUser)

    if (!userNotFound) throw new AppError('Usuário não encontrado')

    await this.usersRepository.delete(idUser)
  }
}
