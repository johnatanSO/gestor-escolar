import { S3 } from 'aws-sdk'
import { resolve } from 'path'
import fs from 'fs'
import mime from 'mime-types'

import { IStorageProvider } from './IStorageProvider'
import upload from '../../../../config/upload'
import { AppError } from '../../../errors/AppError'

export class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async uploadImage(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file)
    const fileContent = await fs.promises.readFile(originalName)

    const ContentType = mime.lookup(originalName) || ''

    try {
      await this.client
        .putObject({
          Bucket: `${process.env.AWS_BUCKET}/${folder}`,
          Key: file,
          ACL: 'public-read',
          Body: fileContent,
          ContentType,
        })
        .promise()
    } catch (err) {
      console.log('ERROR AO FAZER UPLOAD DE IMAGEM', err)
      throw new AppError(err.message)
    }

    await fs.promises.unlink(originalName)

    const imageURL = `${process.env.AWS_BUCKET_URL}/${folder}/${file}`

    return imageURL
  }

  async deleteImage(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise()
  }
}
