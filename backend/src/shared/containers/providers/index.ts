import { container } from 'tsyringe'

import { S3StorageProvider } from './StorageProvider/S3StorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  S3StorageProvider,
)
