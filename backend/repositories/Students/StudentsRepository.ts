import { StudentModel } from '../../models/student'
import { IStudentsRepository, NewStudent } from './IStudentsRepository'

export class StudentsRepository implements IStudentsRepository {
  async list(): Promise<any[]> {
    const students = await StudentModel.find()
    return students
  }

  async getEntries(): Promise<number> {
    return await StudentModel.countDocuments()
  }

  async create(newStudentData: NewStudent) {
    const newStudent = new StudentModel(newStudentData)
    await newStudent.save()
  }
}
