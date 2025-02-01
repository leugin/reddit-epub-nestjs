import { Module } from '@nestjs/common';
import { RedditController } from './reddit/reddit.controller';
import { RedditService } from '../../provider/reddit/reddit.service';
import { RedditFindAllService } from './services/reddit-find-all/reddit-find-all.service';
import { StorageModule } from '../../shared/storage/storage.module';

@Module({
  controllers: [RedditController],
  providers: [RedditService, RedditFindAllService],
  imports: [StorageModule],
})
export class RedditModule {}
