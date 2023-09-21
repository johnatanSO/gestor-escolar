import { Types } from 'mongoose'
import { MockWarningsRepository } from '../../../repositories/Warnings/MockWarningsRepository'
import { ListWarningsService } from './ListWarningsService.service'
import { CreateNewWarningService } from '../CreateNewWarning/CreateNewWarningService.service'

let mockWarningsRepository: MockWarningsRepository

let createNewWarningService: CreateNewWarningService
let listWarningsService: ListWarningsService

describe('Listwarnings', () => {
  beforeEach(() => {
    mockWarningsRepository = new MockWarningsRepository()

    createNewWarningService = new CreateNewWarningService(
      mockWarningsRepository,
    )
    listWarningsService = new ListWarningsService(mockWarningsRepository)
  })
  it('should be able list warnings', async () => {
    const idStudent = new Types.ObjectId()

    await createNewWarningService.execute({
      title: 'New title warning',
      description: 'New description warning test',
      code: '1',
      idStudent: idStudent.toString(),
    })

    const warnings = await listWarningsService.execute(idStudent.toString())

    expect(warnings).toContainEqual(expect.objectContaining({ idStudent }))
  })
})
