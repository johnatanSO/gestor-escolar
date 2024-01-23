import { User } from '../../entities/user'

export interface INewUserDTO {
  code: string
  name: string
  email: string
  password: string
  occupation: string
  idTeacher?: string
}

export interface IUsersRepository {
  create: (newUserData: INewUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  findById: (_id: string) => Promise<User>
  update: (filters: any, updateFields: any) => Promise<void>
  delete: (idUser: string) => Promise<void>
  listStudents(idTeacher: string): Promise<User[]>
  getStudentsEntries(idTeacher: string): Promise<number>
}
