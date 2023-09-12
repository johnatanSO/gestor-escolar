import { inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../repositories/Students/IStudentsRepository'
import {
  IUsersRepository,
  NewUser,
} from '../../repositories/Users/IUsersRepository'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
dotenv.config()
const saltRounds = 10

@injectable()
export class CreateNewUserService {
  usersRepository: IUsersRepository
  studentsRepository: IStudentsRepository
  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('StudentsRepository') studentsRepository: IStudentsRepository,
  ) {
    this.usersRepository = usersRepository
    this.studentsRepository = studentsRepository
  }

  async execute({
    name,
    email,
    password,
    occupation,
  }: NewUser): Promise<NewUser> {
    const alreadExistUser = await this.usersRepository.findByEmail(email)

    if (alreadExistUser) {
      throw new Error('Já existe um usuário cadastrado com este e-mail!')
    }

    const encryptedPassword: string = await bcrypt.hash(password, saltRounds)
    const newUser = await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      occupation,
    })

    if (occupation === 'student') {
      const entries = await this.studentsRepository.getEntries()
      const code = (entries + 1).toString()

      this.studentsRepository.create({
        code,
        name: newUser.name,
        _id: newUser._id,
      })
    }

    return newUser
  }
}
