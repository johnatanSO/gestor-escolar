import { Model } from 'mongoose'
import { User, UserModel } from '../../entities/user'
import { INewUserDTO, IUsersRepository } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  model: Model<User>
  constructor() {
    this.model = UserModel
  }

  async create({
    code,
    name,
    password,
    email,
    occupation,
    idTeacher,
  }: INewUserDTO): Promise<User> {
    const newUser = await this.model.create({
      code,
      name,
      password,
      email,
      occupation,
      teacher: idTeacher,
    })
    await newUser.save()
    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email })
  }

  async findById(_id: string): Promise<User> {
    return await this.model.findOne({ _id })
  }

  async update(filters: any, updateFields: any): Promise<void> {
    await this.model.updateMany(filters, updateFields)
  }

  async delete(idUser: string): Promise<void> {
    await this.model.deleteOne({ _id: idUser })
  }

  async listStudents(idTeacher: string): Promise<User[]> {
    return await this.model.find({ teacher: idTeacher, occupation: 'student' })
  }

  async getStudentsEntries(idTeacher: string): Promise<number> {
    return await this.model.count({ idTeacher, occupation: 'student' })
  }

  async incrementWarningsAmount(idUser: string): Promise<void> {
    await this.model.updateOne({ _id: idUser }, { $inc: { warningsAmount: 1 } })
  }
}
