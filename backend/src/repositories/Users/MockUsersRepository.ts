import { Types } from 'mongoose'
import { User } from '../../entities/user'
import { INewUserDTO, IUsersRepository } from './IUsersRepository'

export class MockUsersRepository implements IUsersRepository {
  users: User[] = []
  async create(newUserData: INewUserDTO): Promise<User> {
    const newUser = {
      ...newUserData,
      _id: new Types.ObjectId(),
    }
    this.users.push(newUser)

    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(_id: string): Promise<User> {
    return this.users.find((user) => user._id.toString() === _id)
  }

  async update(filters: any, updateFields: any): Promise<void> {
    const fields = updateFields.$set
    this.users.forEach((user) => {
      if (user._id === filters._id) {
        user = {
          ...user,
          ...fields,
        }
      }
    })
  }
}
