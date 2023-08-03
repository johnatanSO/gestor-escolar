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
      token: (Math.random() * 8975487548749877).toString(),
    })

    if (occupation === 'student') {
      const entries = await this.studentsRepository.getEntries()
      const code = (entries + 1).toString()

      this.studentsRepository.create({ name, code })
    }

    return newUser
  }
}
