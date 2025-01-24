import { Module } from '@nestjs/common';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { BookRepositoryService } from './book-repository/book-repository.service';

@Module({
  providers: [PrismaService, BookRepositoryService],
  exports: [BookRepositoryService],
})
export class RepositoriesModule {}
