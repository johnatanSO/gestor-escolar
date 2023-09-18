import { Model } from 'mongoose'
import { User, UserModel } from '../../entities/user'
import { INewUserDTO, IUsersRepository } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  model: Model<User>
  constructor() {
    this.model = UserModel
  }

  async create({
    name,
    password,
    email,
    occupation,
  }: INewUserDTO): Promise<User> {
    const newUser = await this.model.create({
      name,
      password,
      email,
      occupation,
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
}
