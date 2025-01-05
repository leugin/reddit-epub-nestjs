import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { RedditService } from './provider/reddit/reddit.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly reeditService: RedditService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/api/v1/reddit/find')
  async findAll(
    @Query('sub_reddit') subReddit: string,
    @Query('search') search: string,
    @Res() res: Response,
  ) {
    const data = await this.reeditService.findAll(subReddit, search);
    const json = await data;
    res.status(HttpStatus.OK).json(json);
  }
}
