import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { User } from '../../../entities/user'
import { AppError } from '../../../errors/AppError'

@injectable()
export class GetUserInfoService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(userId: string): Promise<User> {
    if (!userId) throw new AppError('_id do usuário não foi informado')

    const userInfo = await this.usersRepository.findById(userId)

    if (!userInfo) throw new AppError('Usuário não encontrado')

    return userInfo
  }
}
