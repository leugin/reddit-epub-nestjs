import { Module } from '@nestjs/common';
import { RedditController } from './reddit/reddit.controller';
import { RedditService } from '../../provider/reddit/reddit.service';
import { StorageService } from '../../provider/storage/storage.service';
import { RedditFindAllService } from './services/reddit-find-all/reddit-find-all.service';

@Module({
  controllers: [RedditController],
  providers: [RedditService, StorageService, RedditFindAllService],
})
export class RedditModule {}
