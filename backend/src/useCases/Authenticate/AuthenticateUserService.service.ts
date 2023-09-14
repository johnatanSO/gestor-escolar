import { IUsersRepository } from '../../repositories/Users/IUsersRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { inject, injectable } from 'tsyringe'
dotenv.config()

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
    occupation: string
  }
  token: string
}

@injectable()
export class AuthenticateUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new Error('E-mail ou senha incorreto')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorreto')
    }

    const token = jwt.sign({}, process.env.SECRET, {
      subject: user._id.toString(),
      expiresIn: '1d',
    })

    return {
      user: {
        name: user.name,
        email: user.email,
        occupation: user.occupation,
      },
      token,
    }
  }
}
