import { IStudentsRepository } from '../repositories/Students/IStudentsRepository'
import {
  IUsersRepository,
  NewUser,
} from '../repositories/Users/IUsersRepository'

export class CreateNewUserService {
  usersRepository: IUsersRepository
  studentsRepository: IStudentsRepository
  constructor(
    usersRepository: IUsersRepository,
    studentsRepository: IStudentsRepository,
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
    const alreadExistUser = await this.usersRepository.findByEmail(name)

    if (alreadExistUser) {
      throw new Error('Já existe um usuário cadastrado com este e-mail!')
    }

    const newUser = this.usersRepository.create({
      name,
      email,
      password,
      occupation,
    })

    if (occupation === 'student') {
      this.studentsRepository.create(name)
    }

    return newUser
  }
}
