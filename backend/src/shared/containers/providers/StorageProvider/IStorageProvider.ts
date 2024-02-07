export interface IStorageProvider {
  uploadImage(file: string, folder: string): Promise<string>
  deleteImage(file: string, folder: string): Promise<void>
}
