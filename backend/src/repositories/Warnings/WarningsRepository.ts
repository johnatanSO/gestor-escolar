import { WarningModel } from '../../entities/warning'
import { IWarningsRepository, NewWarning, Warning } from './IWarningsRepository'

export class WarningsRepository implements IWarningsRepository {
  async list(idStudent?: string): Promise<Warning[]> {
    const query = {
      ...(idStudent ? { idStudent } : {}),
    }
    return await WarningModel.find(query).sort({ date: 1 })
  }

  async findById(warningId: string): Promise<Warning | null> {
    return await WarningModel.findOne({ _id: warningId })
  }

  async create(newWarningData: NewWarning): Promise<any> {
    const newWarning = new WarningModel(newWarningData)
    await newWarning.save()

    return newWarning
  }

  async getEntries(idStudent: string): Promise<number> {
    return await WarningModel.countDocuments({ idStudent })
  }
}
