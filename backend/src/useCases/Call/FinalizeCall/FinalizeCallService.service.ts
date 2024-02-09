import { inject, injectable } from 'tsyringe'
import { ICallsRepository } from '../../../repositories/Calls/ICallsRepository'
import { ICall } from '../../../entities/call'
import { AppError } from '../../../shared/errors/AppError'

interface IStudentCall {
  idStudent: string
  present: boolean
}

@injectable()
export class FinalizeCallService {
  callsRepository: ICallsRepository
  constructor(@inject('CallsRepository') callsRepository: ICallsRepository) {
    this.callsRepository = callsRepository
  }

  async execute(students: IStudentCall[]): Promise<ICall> {
    if (students.length === 0) throw new AppError('Nenhum aluno selecionado')

    const call = await this.callsRepository.create(students)

    return call
  }
}
