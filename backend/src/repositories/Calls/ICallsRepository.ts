import { ICall } from '../../entities/call'

export interface IStudentsCallDTO {
  idStudent: string
  present: boolean
}

export interface ICallsRepository {
  create(students: IStudentsCallDTO[], date: string): Promise<ICall>
  findByDate(startDate: string, endDate: string): Promise<ICall>
}
