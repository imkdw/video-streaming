import { Controller, Get, Req, Res } from '@nestjs/common';
import VideoService from './video.service';
import { Request, Response } from 'express';

@Controller('video')
export default class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async streaming(@Req() req: Request, @Res() res: Response) {
    await this.videoService.streaming(req, res);
  }
}
