import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { RedditService } from './provider/reddit/reddit.service';
import { extractPageOfPost } from './provider/reddit/tools';
import { StorageService } from './provider/storage/storage.service';
import { temps } from './provider/storage/dtos/Paths';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'node:fs';
const path = require('path');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly reeditService: RedditService,
    private readonly storageService: StorageService,
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
    const uuid = Math.random().toString(36).substring(2, 15);
    const path = temps(uuid);
    await this.storageService.save(path + '.json', JSON.stringify(tempEpub));
    res.status(HttpStatus.OK).json({
      uuid: uuid,
    });
  }

  @Get('/api/v1/reddit/:uuid')
  async show(@Param('uuid') uuid: string, @Res() res: Response) {
    const path = temps(uuid) + '.json';

    const exists = await this.storageService.checkExist(path);
    if (!exists) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'resource missing',
      });
      return;
    }
    try {
      const file = createReadStream(path);
      file.pipe(res);
    } catch (e) {
      console.log('errro', e);
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'resource missing',
      });
    }
  }
}
