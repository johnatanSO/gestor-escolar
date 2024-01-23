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
  uploadImage(file: IUploadImageDTO): Promise<IResponseUpload>
  deleteImage(imageName: string): Promise<void>
}
