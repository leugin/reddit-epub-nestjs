import { Module } from '@nestjs/common';
import { BooksFindAllService } from './services/books-find-all/books-find-all.service';
import { BooksController } from './books/books.controller';
import { BookRepositoryService } from '../../shared/repositories/book-repository/book-repository.service';
import { PrismaService } from '../../provider/prisma/prisma.service';

@Module({
  providers: [PrismaService, BooksFindAllService, BookRepositoryService],
  controllers: [BooksController],
})
export class BooksModule {}
