import { container } from 'tsyringe'
import { StudentsRepository } from '../../repositories/Students/StudentsRepository'
import { IStudentsRepository } from '../../repositories/Students/IStudentsRepository'

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepository,
)
