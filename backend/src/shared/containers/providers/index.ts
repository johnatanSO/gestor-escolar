import { container } from 'tsyringe'

import { FirebaseProvider } from './StorageProvider/FirebaseProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

container.registerSingleton<IStorageProvider>(
  'FirebaseProvider',
  FirebaseProvider,
)
