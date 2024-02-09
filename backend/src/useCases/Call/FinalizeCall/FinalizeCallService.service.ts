import { inject, injectable } from 'tsyringe'
import { ICallsRepository } from '../../../repositories/Calls/ICallsRepository'
import { ICall } from '../../../entities/call'
import { AppError } from '../../../shared/errors/AppError'
import dayjs from 'dayjs'

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

  async execute(students: IStudentCall[], date: string): Promise<ICall> {
    if (students.length === 0) throw new AppError('Nenhum aluno selecionado')

    const startDate = dayjs(date).startOf('day').toISOString()
    const endDate = dayjs(date).endOf('day').toISOString()

    const callAlreadyExists = await this.callsRepository.findByDate(
      startDate,
      endDate,
    )

    if (callAlreadyExists)
      throw new AppError('Já existe uma chamada criada neste dia ')

    const call = await this.callsRepository.create(students, date)

    return call
  }
}
