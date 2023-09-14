import { User } from '../../entities/user'

export interface INewUserDTO {
  name: string
  email: string
  password: string
  occupation: string
}

export interface IUsersRepository {
  create: (newUserData: INewUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User>
}
