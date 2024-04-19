import { container } from 'tsyringe'

// import { S3StorageProvider } from './StorageProvider/S3StorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'
import { FirebaseProvider } from './StorageProvider/FirebaseProvider'

container.registerSingleton<IStorageProvider>(
  'FirebaseProvider',
  FirebaseProvider,
)
