import { MockStudentsRepository } from '../../../repositories/Students/MockStudentsRepository'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { UpdateWarningsAmount } from './UpdateWarningsAmount.service'

let updateWarningsAmount: UpdateWarningsAmount
let mockStudentsRepository: MockStudentsRepository
let mockUsersRepository: MockUsersRepository

describe('Update numbers of student warnings', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()
    mockStudentsRepository = new MockStudentsRepository(mockUsersRepository)

    updateWarningsAmount = new UpdateWarningsAmount(mockStudentsRepository)
  })

  it('should not be able update numbers of warnings if idStudent no sent', () => {
    expect(async () => {
      await updateWarningsAmount.execute()
    })
  })
})
