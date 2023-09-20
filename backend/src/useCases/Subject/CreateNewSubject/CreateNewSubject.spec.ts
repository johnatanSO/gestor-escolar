import { Types } from 'mongoose'
import { MockSubjectsRepository } from '../../../repositories/Subjects/MockSubjectsRepository'
import { CreateNewSubjectService } from './CreateNewSubjectService.service'
import { AppError } from '../../../errors/AppError'

let mockSubjectsRepository: MockSubjectsRepository

let createNewSubjcetService: CreateNewSubjectService

describe('Create new subject', () => {
  beforeEach(() => {
    mockSubjectsRepository = new MockSubjectsRepository()

    createNewSubjcetService = new CreateNewSubjectService(
      mockSubjectsRepository,
    )
  })

  it('should be able create a new subject', async () => {
    const newSubject = await createNewSubjcetService.execute({
      name: 'Teste subject',
      idTeacher: new Types.ObjectId().toString(),
    })

    const createdSubject = mockSubjectsRepository.findById(
      newSubject._id.toString(),
    )

    expect(createdSubject).toBeDefined()
  })

  it('should not be able create a new subject if name not sent', async () => {
    await expect(async () => {
      await createNewSubjcetService.execute({
        name: undefined,
        idTeacher: new Types.ObjectId().toString(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a new subject if idTeacher not sent', async () => {
    await expect(async () => {
      await createNewSubjcetService.execute({
        name: 'Nome de teste',
        idTeacher: undefined,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
