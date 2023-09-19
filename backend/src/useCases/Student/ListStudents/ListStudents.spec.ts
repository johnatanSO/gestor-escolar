import { AppError } from '../../../errors/AppError'
import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewUserService } from '../../User/CreateNewUserService.service'
import { CreateNewStudentService } from '../CreateNewStudent/CreateNewStudentService.service'
import { ListStudentsService } from './ListStudentsService.service'

let mockUsersRepository: MockUsersRepository
let mockStudentsRepository: MockStudentsRepository

let listStudentsService: ListStudentsService
let createNewUserService: CreateNewUserService
let createNewStudentService: CreateNewStudentService

describe('List all students', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)

    listStudentsService = new ListStudentsService(mockStudentsRepository)
    createNewUserService = new CreateNewUserService(mockUsersRepository)
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
  })

  it('should not be able list students if the teacher _id is not sent', () => {
    expect(async () => {
      await listStudentsService.execute({ idTeacher: undefined })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able list students', async () => {
    const newTeacher = await createNewUserService.execute({
      name: 'test teacher',
      email: 'test@test.com',
      password: '123456',
      occupation: 'teacher',
    })

    const newUserStudent = await createNewUserService.execute({
      name: 'test student',
      email: 'testStudent@test.com',
      password: '123456',
      occupation: 'student',
    })

    await createNewStudentService.execute({
      _id: newUserStudent._id,
      idTeacher: newTeacher._id.toString(),
    })

    const students = await listStudentsService.execute({
      idTeacher: newTeacher._id.toString(),
    })

    expect(students).not.toHaveLength(0)
  })
})
