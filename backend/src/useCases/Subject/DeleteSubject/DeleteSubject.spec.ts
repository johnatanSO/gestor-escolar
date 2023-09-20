import { Types } from 'mongoose'
import { MockSubjectsRepository } from '../../../repositories/Subjects/MockSubjectsRepository'
import { CreateNewSubjectService } from '../CreateNewSubject/CreateNewSubjectService.service'
import { DeleteSubjectService } from './DeleteSubjectService.service'
import { AppError } from '../../../errors/AppError'

let mockSubjectsRepository: MockSubjectsRepository

let createNewSubjcetService: CreateNewSubjectService
let deleteSubjectService: DeleteSubjectService

describe('Delete a subject', () => {
  beforeEach(() => {
    mockSubjectsRepository = new MockSubjectsRepository()

    createNewSubjcetService = new CreateNewSubjectService(
      mockSubjectsRepository,
    )
    deleteSubjectService = new DeleteSubjectService(mockSubjectsRepository)
  })

  it('should be able delete a subject', async () => {
    const newSubject = await createNewSubjcetService.execute({
      name: 'Teste subject',
      idTeacher: new Types.ObjectId().toString(),
    })

    await deleteSubjectService.execute(newSubject._id.toString())

    const notFoundSubject = await mockSubjectsRepository.findById(
      newSubject._id.toString(),
    )

    expect(notFoundSubject).toBeUndefined()
  })

  it('should not be able delete a subject if idSubject is from a invalid subject', async () => {
    await expect(async () => {
      await deleteSubjectService.execute(new Types.ObjectId().toString())
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able delete a subject if idSubject not sent', async () => {
    await expect(async () => {
      await deleteSubjectService.execute(undefined)
    }).rejects.toBeInstanceOf(AppError)
  })
})
