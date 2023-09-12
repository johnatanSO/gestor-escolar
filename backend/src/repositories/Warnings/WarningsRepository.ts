import { Model } from 'mongoose'
import { WarningModel } from '../../entities/warning'
import { IWarningsRepository, NewWarning, Warning } from './IWarningsRepository'

export class WarningsRepository implements IWarningsRepository {
  model: Model<any>
  constructor() {
    this.model = WarningModel
  }

  async list(idStudent?: string): Promise<Warning[]> {
    const query = {
      ...(idStudent ? { idStudent } : {}),
    }
    return await this.model.find(query).sort({ date: 1 })
  }

  async findById(warningId: string): Promise<Warning | null> {
    return await this.model.findOne({ _id: warningId })
  }

  async create(newWarningData: NewWarning): Promise<any> {
    const newWarning = await this.model.create(newWarningData)
    await newWarning.save()

    return newWarning
  }

  async getEntries(idStudent: string): Promise<number> {
    return await this.model.countDocuments({ idStudent })
  }
}
