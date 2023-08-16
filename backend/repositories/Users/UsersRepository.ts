import { UserModel } from '../../models/user'
import { IUsersRepository, NewUser } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  async create({
    name,
    password,
    email,
    occupation,
  }: NewUser): Promise<NewUser> {
    const newUser = new UserModel({
      name,
      password,
      email,
      occupation,
    })
    await newUser.save()
    return newUser
  }

  async findByEmail(email: string): Promise<NewUser> {
    return await UserModel.findOne({ email }, '-password')
  }

  async authenticate(email: string): Promise<any> {
    return await UserModel.findOne({ email })
  }

  async checkToken(token: string): Promise<any> {
    return await UserModel.findOne({ token }, '-password')
  }
}
