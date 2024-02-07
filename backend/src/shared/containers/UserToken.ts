import { container } from 'tsyringe'

import { UsersTokensRepository } from '../../repositories/UsersTokens/UsersTokensRepository'
import { IUsersTokensRepository } from './../../repositories/UsersTokens/IUsersTokensRepository'

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
)
