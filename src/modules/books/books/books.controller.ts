import {
  Body,
  Controller,
  Get,
  Param,
  Post, Put,
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
import { ActiveUser } from '../../../shared/decorators/active-user/active.user';

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
  async findBook(
    @ActiveUser() payload: any,
    @Query('search') search: string | null,
  ) {
    const data = await this.bookRepository.paginate({
      // search: search,
      created_by_id: payload.sub,
    });
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
  @UseGuards(AuthGuard)
  @Post('/:uuid')
  async store(
    @ActiveUser() payload: any,
    @Param('uuid') uuid: string,
    @Body() storeBookDto: StoreBookDto,
  ) {
    storeBookDto.created_by_id = payload.sub;
    const response = await this.booksStoreService.invoke(uuid, storeBookDto);
    return {
      data: response,
      message: 'ok',
    };
  }
  @UseGuards(AuthGuard)
  @Put('/:uuid')
  async update(
    @ActiveUser() payload: any,
    @Param('uuid') uuid: string,
    @Body() storeBookDto: StoreBookDto,
  ) {
    storeBookDto.created_by_id = payload.sub;
    const response = await this.booksStoreService.invoke(uuid, storeBookDto);
    return {
      data: response,
      message: 'ok',
    };
  }
}
