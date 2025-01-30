import { Module } from '@nestjs/common';
import { AwsStorageService } from './services/aws/aws-storage.service';

@Module({
  imports: [],
  exports: [AwsStorageService.provider()],
  providers: [AwsStorageService.provider()],
})
export class StorageModule {}
