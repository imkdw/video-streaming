import { Injectable } from '@nestjs/common';
import AwsService from '../aws/aws.service';
import { Request, Response } from 'express';
import { pipeline } from 'stream/promises';

@Injectable()
export default class VideoService {
  private CHUNK_SIZE: number;

  constructor(private readonly awsService: AwsService) {
    this.CHUNK_SIZE = 100000;
  }

  async streaming(req: Request, res: Response) {
    try {
      const controller = new AbortController();

      const videoKey = '괴물쥐_232M.mp4';

      const videoSize = await this.awsService.getObjectFileSize(videoKey);

      const requestedRange = req.headers.range || '';
      const start = parseInt(requestedRange.split('=')[1].replace('-', ''), 10);
      console.log(requestedRange, start);
      const end = Math.min(start + this.CHUNK_SIZE, videoSize - 1);
      const contentLength = end - start + 1;

      res.statusCode = 206;
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Range', `bytes ${start}-${end}/${videoSize}`);
      res.setHeader('Content-Length', contentLength);

      await pipeline(
        this.awsService.initiateObjectStream(videoKey, start, end),
        res,
        { signal: controller.signal },
      );
    } catch (error) {
      console.log(error);
    }
  }
}
