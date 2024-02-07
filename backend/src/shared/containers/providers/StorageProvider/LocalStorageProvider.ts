import fs from 'fs'
import { resolve } from 'path'
import { IStorageProvider } from './IStorageProvider'
import upload from '../../../../config/upload'

export class LocalStorageProvider implements IStorageProvider {
  async uploadImage(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    )

    return file
  }

  async deleteImage(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file)
    try {
      await fs.promises.stat(filename)
    } catch (err) {}

    await fs.promises.unlink(filename)
  }
}
