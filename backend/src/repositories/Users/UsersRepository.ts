import { Model } from 'mongoose'
import { UserModel } from '../../entities/user'
import { IUsersRepository, NewUser } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  model: Model<any>
  constructor() {
    this.model = UserModel
  }

  async create({
    name,
    password,
    email,
    occupation,
  }: NewUser): Promise<NewUser> {
    const newUser = await this.model.create({
      name,
      password,
      email,
      occupation,
    })
    await newUser.save()
    return newUser
  }

  async findByEmail(email: string): Promise<NewUser> {
    return await this.model.findOne({ email }, '-password')
  }

  async authenticate(email: string): Promise<any> {
    return await this.model.findOne({ email })
  }

  async checkToken(token: string): Promise<any> {
    return await this.model.findOne({ token }, '-password')
  }
}
