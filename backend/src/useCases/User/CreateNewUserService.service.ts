import { CreateNewStudentService } from './../Student/CreateNewStudentService.service'
import { container, inject, injectable } from 'tsyringe'
import {
  INewUserDTO,
  IUsersRepository,
} from '../../repositories/Users/IUsersRepository'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import { User } from '../../entities/user'
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
    const alreadExistUser = await this.usersRepository.findByEmail(email)
    if (alreadExistUser) {
      throw new Error('Já existe um usuário cadastrado com este e-mail!')
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      occupation,
    })

    if (newUser.occupation === 'student') {
      const createNewStudentService = container.resolve(CreateNewStudentService)
      await createNewStudentService.execute(newUser)
    }

    return newUser
  }
}
