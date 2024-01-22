import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import bcrypt from 'bcrypt'
import { AppError } from '../../../shared/errors/AppError'
import { Types } from 'mongoose'
const saltRounds = 10

interface IRequest {
  name: string
  email: string
  password: string
  occupation: string
}

interface IResponse {
  _id: Types.ObjectId
  code: string
  name: string
  email: string
  occupation: string
  avatar: string
}

@injectable()
export class CreateNewUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    password,
    occupation,
  }: IRequest): Promise<IResponse> {
    if (!name) throw new AppError('Nome de usuário não informado')
    if (!email) throw new AppError('E-mail do usuário não informado')
    if (!password) throw new AppError('Senha do usuário não informada')
    if (!occupation) throw new AppError('Ocupação do usuário não informada')

    const alreadExistUser = await this.usersRepository.findByEmail(email)

    if (alreadExistUser) {
      throw new AppError('Já existe um usuário cadastrado com este e-mail')
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = await this.usersRepository.create({
      code: '1',
      name,
      email,
      password: encryptedPassword,
      occupation,
    })

    return {
      _id: newUser._id,
      code: newUser.code,
      name: newUser.name,
      email: newUser.email,
      occupation: newUser.occupation,
      avatar: newUser.avatar,
    }
  }
}
