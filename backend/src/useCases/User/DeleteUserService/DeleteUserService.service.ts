import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
export class DeleteUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(idUser: string): Promise<void> {
    const userNotFound = await this.usersRepository.findById(idUser)

    if (!userNotFound) {
      throw new AppError('Usuário não encontrado')
    }

    await this.usersRepository.delete(idUser)
  }
}
