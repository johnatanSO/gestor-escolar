import { IUsersRepository } from './../../repositories/Users/IUsersRepository'
import { UsersRepository } from './../../repositories/Users/UsersRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
