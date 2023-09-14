import { CreateNewStudentService } from './../Student/CreateNewStudentService.service'
import { container, inject, injectable } from 'tsyringe'
import { IStudentsRepository } from '../../repositories/Students/IStudentsRepository'
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
  }: INewUserDTO): Promise<User> {
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

    if (newUser.occupation === 'student') {
      const createNewStudentService = container.resolve(CreateNewStudentService)
      await createNewStudentService.execute(newUser)
    }

    return newUser
  }
}
