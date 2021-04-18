export interface Storage {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
