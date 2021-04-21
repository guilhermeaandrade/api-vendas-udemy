import uploadConfig from "@config/upload";
import aws, { S3 } from "aws-sdk";
import mime from "mime-types";
import fs from "fs";
import path from "path";
import { IStorage } from "./IStorage";

class S3StorageProvider implements IStorage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.APP_AWS_REGION,
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
      signatureVersion: "v4",
      apiVersion: "2006-03-01",
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const ContentType = mime.lookup(originalPath);
    if (!ContentType) throw new Error("File not found");

    const fileContent = await fs.promises.readFile(originalPath);
    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default new S3StorageProvider();
