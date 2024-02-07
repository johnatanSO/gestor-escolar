import { IStorageProvider } from './IStorageProvider'

export class MockStorageProvider implements IStorageProvider {
  images: any[] = []

  async uploadImage(image: string, folder: string): Promise<string> {
    this.images.push(image)

    const imageURL = `/${folder}/${image}`

    return imageURL
  }

  async deleteImage(imageName: string, folder: string): Promise<void> {
    this.images.filter((image) => image !== imageName)
  }
}
