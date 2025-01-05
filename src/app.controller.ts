import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { RedditService } from './provider/reddit/reddit.service';
import { extractPageOfPost } from './provider/reddit/tools';

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
    @Query('title') title: string,
    @Res() res: Response,
  ) {
    const body = await this.reeditService.findAll(subReddit, search);
    const clearedPost = [];
    body.forEach((item) => {
      const p = extractPageOfPost(item.data);
      if (p === null) return;
      clearedPost.push(p);
    });
    clearedPost.sort((a, b) => {
      return a.created - b.created;
    });

    const tempEpub = {
      title: clearedPost.length > 0 ? clearedPost[0].title : title,
      author: clearedPost.length > 0 ? clearedPost[0].author : subReddit,
      content: clearedPost,
    };
    res.status(HttpStatus.OK).json(tempEpub);
  }
}
