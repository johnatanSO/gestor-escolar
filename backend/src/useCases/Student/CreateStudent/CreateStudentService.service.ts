import { inject, injectable } from 'tsyringe'
import bcrypt from 'bcrypt'

import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { User } from '../../../entities/user'
import { AppError } from '../../../shared/errors/AppError'
import { Types } from 'mongoose'
const saltRounds = 10

interface IRequest {
  idTeacher: string
  name: string
  email: string
  password: string
}

interface IResponse {
  _id: Types.ObjectId
  code: string
  name: string
  email: string
  occupation: string
  avatar: string
  teacher: Types.ObjectId | User
}

@injectable()
export class CreateStudentService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    password,
    idTeacher,
  }: IRequest): Promise<IResponse> {
    if (!name) throw new AppError('Nome de usuário não informado')
    if (!email) throw new AppError('E-mail do usuário não informado')
    if (!password) throw new AppError('Senha do usuário não informada')

    const alreadExistUser = await this.usersRepository.findByEmail(email)

    if (alreadExistUser) {
      throw new AppError('Já existe um usuário cadastrado com este e-mail')
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    const code = await this.usersRepository.getStudentsEntries(idTeacher)

    const newStudent = await this.usersRepository.create({
      code: (code + 1).toString(),
      name,
      email,
      password: encryptedPassword,
      occupation: 'student',
      idTeacher,
    })

    return {
      _id: newStudent._id,
      code: newStudent.code,
      name: newStudent.name,
      email: newStudent.email,
      occupation: newStudent.occupation,
      avatar: newStudent.avatar,
      teacher: newStudent.teacher,
    }
  }
}
