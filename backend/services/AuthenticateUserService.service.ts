import { IUsersRepository, User } from '../repositories/Users/IUsersRepository'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export class AuthenticateUserService {
  usersRepository: IUsersRepository
  constructor(productsRepository: IUsersRepository) {
    this.usersRepository = productsRepository
  }

  async execute({ email, password }: any): Promise<any> {
    const user = await this.usersRepository.authenticate({ email, password })
    if (!user) {
      throw new Error('E-mail e/ou senha incorretos.')
    }

    return user
  }

  async getToken(user: User) {
    return jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '365d',
    })
  }
}
