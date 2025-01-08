import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedditService } from './provider/reddit/reddit.service';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './provider/storage/storage.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, RedditService, StorageService],
})
export class AppModule {}
