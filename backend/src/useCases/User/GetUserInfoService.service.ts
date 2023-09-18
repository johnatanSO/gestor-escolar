import { IUsersRepository } from '../../repositories/Users/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { User } from '../../entities/user'

@injectable()
export class GetUserInfoService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(userId: string): Promise<User> {
    const userInfo = await this.usersRepository.findById(userId)
    return userInfo
  }
}
