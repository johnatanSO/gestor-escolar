import { WarningsRepository } from './../../repositories/Warnings/WarningsRepository'
import { IWarningsRepository } from './../../repositories/Warnings/IWarningsRepository'
import { container } from 'tsyringe'

container.registerSingleton<IWarningsRepository>(
  'WarningsRepository',
  WarningsRepository,
)
