import { Controller, Get, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import AuthGuard from '../../../shared/guards/auth.guard';
import { Response } from 'express';
import { BookRepositoryService } from '../../../shared/repositories/book-repository/book-repository.service';

@Controller('/api/v1/reddit/books')
export class BooksController {
  constructor(private readonly bookRepository: BookRepositoryService) {}
  @UseGuards(AuthGuard)
  @Get('/')
  async findBook(@Query('search') search: string | null, @Res() res: Response) {
    const data = await this.bookRepository.paginate({ search: search });
    res.status(HttpStatus.OK).json({
      data: data,
      message: 'ok',
    });
  }
}
