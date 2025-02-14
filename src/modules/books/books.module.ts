import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { BookRepositoryService } from '../../shared/repositories/book-repository/book-repository.service';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { BooksFindUuidService } from './services/books-find-uuid/books-find-uuid.service';
import { BooksDownloadService } from './services/books-download/books-download.service';
import { BooksStoreService } from './services/books-store/books-store.service';
import { StorageModule } from '../../shared/storage/storage.module';
import { BooksUpdateService } from './services/books-update/books-update.service';

@Module({
  providers: [
    PrismaService,
    BookRepositoryService,
    BooksFindUuidService,
    BooksDownloadService,
    BooksStoreService,
    BooksUpdateService,
  ],
  controllers: [BooksController],
  imports: [StorageModule],
})
export class BooksModule {}
