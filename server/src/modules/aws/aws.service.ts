import {
  S3Client,
  HeadObjectCommand,
  HeadObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export default class AwsService implements OnModuleInit {
  private s3Client: S3Client;

  constructor() {}

  async onModuleInit() {
    this.s3Client = new S3Client({
      region: process.env.BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * S3에 업로드된 파일의 사이즈를 구한다
   * @returns 파일사이즈
   */
  async getObjectFileSize(key: string): Promise<number> {
    const headObjectCommandInput: HeadObjectCommandInput = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    };

    const command = new HeadObjectCommand(headObjectCommandInput);
    const { ContentLength } = await this.s3Client.send(command);
    return ContentLength || 0;
  }

  async *initiateObjectStream(Key: string, start: number, end: number) {
    const streamRange = `bytes=${start}-${end}`;

    const getObjectCommandInput: GetObjectCommandInput = {
      Key,
      Bucket: process.env.BUCKET_NAME,
      Range: streamRange,
    };
    const command = new GetObjectCommand(getObjectCommandInput);
    const response = await this.s3Client.send(command);

    for await (const chunk of response.Body as any) {
      yield chunk;
    }
  }
}
