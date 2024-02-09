import { container } from 'tsyringe'
import { CallsRepository } from '../../repositories/Calls/CallsRepository'
import { ICallsRepository } from '../../repositories/Calls/ICallsRepository'

container.registerSingleton<ICallsRepository>(
  'CallsRepository',
  CallsRepository,
)
