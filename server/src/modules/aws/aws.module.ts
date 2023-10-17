import { Module } from '@nestjs/common';
import AwsService from './aws.service';

@Module({
  providers: [AwsService],
  exports: [AwsService],
})
export default class AwsModule {}
