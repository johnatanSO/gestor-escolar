import { container } from 'tsyringe'

import { IStorageProvider } from './StorageProvider/IStorageProvider'
import { S3StorageProvider } from './StorageProvider/S3StorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  S3StorageProvider,
)
