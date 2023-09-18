import 'reflect-metadata'
import { CreateNewStudentService } from './CreateNewStudentService.service'
import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'
import { Types } from 'mongoose'

let mockStudentsRepository: MockStudentsRepository
let createNewStudentService: CreateNewStudentService

describe('Creating new student', () => {
  beforeEach(() => {
    mockStudentsRepository = new MockStudentsRepository()
    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
  })

  it('Should be able create a new student', async () => {
    const newStudent = await createNewStudentService.execute({
      _id: new Types.ObjectId(),
      name: 'user 1',
    })

    expect(newStudent).toHaveProperty('_id')
  })
})
