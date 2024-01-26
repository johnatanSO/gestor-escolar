import { container } from 'tsyringe'
import { IGradesRepository } from '../../repositories/Grades/IGradesRepository'
import { GradesRepository } from '../../repositories/Grades/GradesRepository'

container.registerSingleton<IGradesRepository>(
  'GradesRepository',
  GradesRepository,
)
