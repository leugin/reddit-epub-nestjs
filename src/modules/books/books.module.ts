import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { BookRepositoryService } from '../../shared/repositories/book-repository/book-repository.service';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { BooksFindUuidService } from './services/books-find-uuid/books-find-uuid.service';
import { StorageService } from '../../provider/storage/storage.service';

@Module({
  providers: [
    PrismaService,
    StorageService,
    BookRepositoryService,
    BooksFindUuidService,
  ],
  controllers: [BooksController],
})
export class BooksModule {}
