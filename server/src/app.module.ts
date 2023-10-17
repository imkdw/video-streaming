import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import VideoModule from './modules/video/video.module';
import AwsModule from './modules/aws/aws.module';

@Module({
  imports: [VideoModule, ConfigModule.forRoot({ isGlobal: true }), AwsModule],
})
export class AppModule {}
