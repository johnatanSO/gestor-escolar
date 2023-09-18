import 'reflect-metadata'
import { MockUsersRepository } from './../../../repositories/Users/MockUsersRepository'
import { CreateNewUserService } from '../../User/CreateNewUserService.service'
import { CreateNewStudentService } from './CreateNewStudentService.service'
import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'

let mockUsersRepository: MockUsersRepository
let createNewUserService: CreateNewUserService

let mockStudentsRepository: MockStudentsRepository
let createNewStudentService: CreateNewStudentService

describe('Creating new student', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    createNewUserService = new CreateNewUserService(mockUsersRepository)

    mockStudentsRepository = new MockStudentsRepository()
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
  })

  it('Should be able create a new student', async () => {
    const newUser = await createNewUserService.execute({
      name: 'name test student',
      email: 'teste@teste.com',
      password: '123456',
      occupation: 'student',
    })

    const newStudent = await createNewStudentService.execute({
      _id: newUser._id,
      name: newUser.name,
    })

    expect(newStudent).toHaveProperty('_id')
  })
})
