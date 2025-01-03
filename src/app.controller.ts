import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/api/v1/reddit/find')
  findAll(
    @Query('sub_reddit') subReddit: string,
    @Query('search') search: string,
    @Res() res: Response,
  ): any {
    res.status(HttpStatus.OK).json({ subReddit, search });
  }
}
