import { Module } from '@nestjs/common';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { BookRepositoryService } from './book-repository/book-repository.service';
import { UserRepositoryService } from './user-repository/user-repository.service';

@Module({
  providers: [PrismaService, BookRepositoryService, UserRepositoryService],
  exports: [BookRepositoryService, UserRepositoryService],
})
export class RepositoriesModule {}
