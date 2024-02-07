import dayjs from 'dayjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { inject, injectable } from 'tsyringe'

import auth from '../../../config/auth'
import { AppError } from '../../../shared/errors/AppError'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { IUsersTokensRepository } from '../../../repositories/UsersTokens/IUsersTokensRepository'
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
    _id: string
    avatar: string
    avatarURL: string
  }
  token: string
  refreshToken: string
}

@injectable()
export class AuthenticateUserService {
  usersRepository: IUsersRepository
  usersTokensRepository: IUsersTokensRepository

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
  ) {
    this.usersRepository = usersRepository
    this.usersTokensRepository = usersTokensRepository
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('E-mail ou senha incorreto')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new AppError('E-mail ou senha incorreto')
    }

    const token = jwt.sign({}, auth.secretToken, {
      subject: user._id.toString(),
      expiresIn: auth.expiresInToken,
    })

    const refreshToken = jwt.sign({ email }, auth.secretRefreshToken, {
      subject: user._id.toString(),
      expiresIn: auth.expiresInRefreshToken,
    })

    const refreshTokenExpiresDate = dayjs()
      .add(auth.expiresRefreshTokenDays, 'day')
      .toDate()

    await this.usersTokensRepository.create({
      user: user._id.toString(),
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    })

    return {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        occupation: user.occupation,
        avatar: user.avatar,
        avatarURL: user.avatarURL,
      },
      token,
      refreshToken,
    }
  }
}
