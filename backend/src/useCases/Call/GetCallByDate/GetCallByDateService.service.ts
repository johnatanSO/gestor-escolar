import { inject, injectable } from 'tsyringe'
import { ICallsRepository } from '../../../repositories/Calls/ICallsRepository'
import { ICall } from '../../../entities/call'
import { AppError } from '../../../shared/errors/AppError'
import dayjs from 'dayjs'

@injectable()
export class GetCallByDateService {
  callsRepository: ICallsRepository

  constructor(@inject('CallsRepository') callsRepository: ICallsRepository) {
    this.callsRepository = callsRepository
  }

  async execute(date: string): Promise<ICall> {
    if (!date) throw new AppError('Data não informada')

    const startDate = dayjs(date).startOf('day').toISOString()
    const endDate = dayjs(date).endOf('day').toISOString()

    const call = await this.callsRepository.findByDate(startDate, endDate)

    return call
  }
}
