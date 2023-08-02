import { WarningModel } from '../../models/warning'
import { IWarningsRepository, NewWarning, Warning } from './IWarningsRepository'

export class WarningsRepository implements IWarningsRepository {
  async list(): Promise<Warning[]> {
    return await WarningModel.find()
  }

  async findById(warningId: string): Promise<Warning | null> {
    return await WarningModel.findOne({ _id: warningId })
  }

  async create(newWarningData: NewWarning): Promise<any> {
    const newWarning = new WarningModel(newWarningData)
    await newWarning.save()

    return newWarning
  }

  async getEntries() {
    return WarningModel.countDocuments()
  }
}
