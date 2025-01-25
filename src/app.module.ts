import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedditService } from './provider/reddit/reddit.service';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './provider/storage/storage.service';
import { RepositoriesModule } from './shared/repositories/repositories.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';

@Module({
  imports: [ConfigModule.forRoot(), RepositoriesModule, AuthModule,
    JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AppController],
  providers: [AppService, RedditService, StorageService, ],
})
export class AppModule {}
