import { inject, injectable } from 'tsyringe'
import {
  INewUserDTO,
  IUsersRepository,
} from '../../../repositories/Users/IUsersRepository'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import { User } from '../../../entities/user'
import { AppError } from '../../../errors/AppError'
dotenv.config()
const saltRounds = 10

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
  }: INewUserDTO): Promise<User> {
    if (!name) throw new AppError('Nome de usuário não informado')
    if (!email) throw new AppError('E-mail do usuário não informado')
    if (!password) throw new AppError('Senha do usuário não informada')
    if (!occupation) throw new AppError('Ocupação do usuário não informada')

    const alreadExistUser = await this.usersRepository.findByEmail(email)

    if (alreadExistUser) {
      throw new AppError('Já existe um usuário cadastrado com este e-mail.')
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      occupation,
    })

    return newUser
  }
}
