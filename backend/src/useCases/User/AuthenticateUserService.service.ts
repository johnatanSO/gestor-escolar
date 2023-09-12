import {
  IUsersRepository,
  User,
} from '../../repositories/Users/IUsersRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { inject, injectable } from 'tsyringe'
dotenv.config()

@injectable()
export class AuthenticateUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }: any): Promise<any> {
    const user = await this.usersRepository.authenticate(email)
    if (!user) {
      throw new Error('E-mail não encontrado')
    }

    const authenticated = await bcrypt.compare(password, user.password)
    if (!authenticated) {
      throw new Error('Senha incorreta')
    }

    return user
  }

  async getToken(user: User) {
    return jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '365d',
    })
  }
}
