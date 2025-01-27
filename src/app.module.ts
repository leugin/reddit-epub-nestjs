import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedditService } from './provider/reddit/reddit.service';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './provider/storage/storage.service';
import { RepositoriesModule } from './shared/repositories/repositories.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RedditModule } from './modules/reddit/reddit.module';
import { BooksModule } from './modules/books/books.module';
import * as process from 'node:process';
import { PrismaService } from './provider/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RepositoriesModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN
          ? process.env.JWT_EXPIRES_IN
          : '1200s',
      },
    }),
    RedditModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, RedditService, StorageService],
})
export class AppModule {}
