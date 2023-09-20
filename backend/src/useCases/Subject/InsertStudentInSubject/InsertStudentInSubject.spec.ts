import { Types } from 'mongoose'
import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewStudentService } from '../../Student/CreateNewStudent/CreateNewStudentService.service'
import { InsertStudentInSubjectService } from './InsertStudentInSubjectService.service'
import { MockSubjectsRepository } from '../../../repositories/Subjects/MockSubjectsRepository'
import { CreateNewSubjectService } from '../CreateNewSubject/CreateNewSubjectService.service'
import { AppError } from '../../../errors/AppError'

let mockUsersRepository: MockUsersRepository
let mockStudentsRepository: MockStudentsRepository
let mockSubjectsRepository: MockSubjectsRepository

let createNewStudentService: CreateNewStudentService
let insertStudentInSubjectService: InsertStudentInSubjectService
let createNewSubjectService: CreateNewSubjectService

describe('Insert student in subject', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)
    mockSubjectsRepository = new MockSubjectsRepository()

    createNewStudentService = new CreateNewStudentService(
      mockStudentsRepository,
    )
    insertStudentInSubjectService = new InsertStudentInSubjectService(
      mockSubjectsRepository,
    )
    createNewSubjectService = new CreateNewSubjectService(
      mockSubjectsRepository,
    )
  })

  it('should be able insert student in subject', async () => {
    const student = await createNewStudentService.execute({
      _id: new Types.ObjectId(),
      idTeacher: new Types.ObjectId().toString(),
    })

    const subject = await createNewSubjectService.execute({
      name: 'Test subject',
      idTeacher: new Types.ObjectId().toString(),
    })

    await insertStudentInSubjectService.execute({
      studentsIds: [student._id.toString()],
      subjectId: subject._id.toString(),
    })

    const updatedSubject = await mockSubjectsRepository.findById(
      subject._id.toString(),
    )

    expect(updatedSubject.students).toContain(student._id.toString())
  })

  it('should not be able insert student in subject if idSubject not sent', async () => {
    expect(async () => {
      const student = await createNewStudentService.execute({
        _id: new Types.ObjectId(),
        idTeacher: new Types.ObjectId().toString(),
      })

      await insertStudentInSubjectService.execute({
        studentsIds: [student._id.toString()],
        subjectId: undefined,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
