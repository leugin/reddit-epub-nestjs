import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedditService } from './provider/reddit/reddit.service';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './provider/storage/storage.service';
import { RepositoriesModule } from './shared/repositories/repositories.module';

@Module({
  imports: [ConfigModule.forRoot(), RepositoriesModule],
  controllers: [AppController],
  providers: [AppService, RedditService, StorageService],
})
export class AppModule {}
