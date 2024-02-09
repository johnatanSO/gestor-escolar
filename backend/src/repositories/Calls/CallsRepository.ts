import { Model } from 'mongoose'
import { CallModel, ICall } from '../../entities/call'
import { ICallsRepository, IStudentsCallDTO } from './ICallsRepository'

export class CallsRepository implements ICallsRepository {
  model: Model<ICall>
  constructor() {
    this.model = CallModel
  }

  async create(students: IStudentsCallDTO[], date: string): Promise<ICall> {
    const newCall = await this.model.create({
      presences: students,
      date,
    })

    await newCall.save()

    return newCall
  }

  async findByDate(startDate: string, endDate: string): Promise<ICall> {
    const call = await this.model.findOne({
      date: { $gte: startDate, $lte: endDate },
    })

    return call
  }
}
