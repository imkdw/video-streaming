import { Module } from '@nestjs/common';
import VideoController from './video.controller';
import VideoService from './video.service';
import AwsModule from '../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export default class VideoModule {}
