export interface IUploadImageDTO {
  originalname: string
  mimetype: string
  buffer: Buffer
}

export interface IResponseUpload {
  imageName: string
  imageURL: string
}

export interface IStorageProvider {
  uploadImage(file: string, folder: string): Promise<string>
  deleteImage(file: string, folder: string): Promise<void>
}
