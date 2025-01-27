import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import AuthGuard from '../../../shared/guards/auth.guard';
import { BookRepositoryService } from '../../../shared/repositories/book-repository/book-repository.service';
import { BooksFindUuidService } from '../services/books-find-uuid/books-find-uuid.service';
import { Response } from 'express';
import { BooksDownloadService } from '../services/books-download/books-download.service';
import { StoreBookDto } from '../../../dtos/store-book.dto';
import { BooksStoreService } from '../services/books-store/books-store.service';

@Controller('/api/v1/reddit/books')
export class BooksController {
  constructor(
    private readonly bookRepository: BookRepositoryService,
    private readonly booksFindUuidService: BooksFindUuidService,
    private readonly booksDownloadService: BooksDownloadService,
    private readonly booksStoreService: BooksStoreService,
  ) {}
  @UseGuards(AuthGuard)
  @Get('/')
  async findBook(@Query('search') search: string | null) {
    const data = await this.bookRepository.paginate({ search: search });
    return {
      data: data,
      message: 'ok',
    };
  }
  @Get('/:uuid')
  async show(@Param('uuid') uuid: string) {
    const book = await this.booksFindUuidService.invoke(uuid);
    return {
      data: book,
      message: 'ok',
    };
  }
  @Get('download/:filename')
  async download(@Param('filename') filename: string, @Res() res: Response) {
    return this.booksDownloadService.invoke(filename, res);
  }

  @Post('/:uuid')
  async store(@Param('uuid') uuid: string, @Body() storeBookDto: StoreBookDto) {
    const response = await this.booksStoreService.invoke(uuid, storeBookDto);
    return {
      data: response,
      message: 'ok',
    };
  }
}
