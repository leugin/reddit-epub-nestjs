import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import AuthGuard from '../../../shared/guards/auth.guard';
import { BookRepositoryService } from '../../../shared/repositories/book-repository/book-repository.service';
import { BooksFindUuidService } from '../services/books-find-uuid/books-find-uuid.service';

@Controller('/api/v1/reddit/books')
export class BooksController {
  constructor(
    private readonly bookRepository: BookRepositoryService,
    private readonly booksFindUuidService: BooksFindUuidService,
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
}
