import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StorageService } from './provider/storage/storage.service';
import { books, temps } from './provider/storage/dtos/Paths';
import { createReadStream } from 'fs';
import { StoreBookDto } from './dtos/store-book.dto';
import epub from 'epub-gen-memory';
import { readFileSync } from 'fs';
import { BookRepositoryService } from './shared/repositories/book-repository/book-repository.service';

@Controller()
export class AppController {
  constructor(
    private readonly storageService: StorageService,
    private readonly bookRepository: BookRepositoryService,
  ) {}

  @Get()
  getHello(): string {
    return 'hello';
  }

  @Get('/api/v1/reddit/book/:uuid')
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
      const fileContent = readFileSync(path, 'utf8'); // Lee el contenido del archivo
      const jsonData = JSON.parse(fileContent); // Convierte el contenido en un objeto JSON

      res.status(HttpStatus.OK).json({
        data: jsonData,
        message: 'resource missing',
      });
    } catch (e) {
      console.log('errro', e);
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'resource missing',
      });
    }
  }
  @Get('/api/v1/reddit/book/download/:filename')
  async download(@Param('filename') filename: string, @Res() res: Response) {
    const path = books(filename);

    const exists = await this.storageService.checkExist(path);
    if (!exists) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'resource missing' + path,
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
  @Post('/api/v1/book/reddit/:uuid')
  async store(
    @Param('uuid') uuid: string,
    @Res() res: Response,
    @Body() storeBookDto: StoreBookDto,
  ) {
    const getName = (options) => {
      const date = new Date();
      date.getDay();
      // create epub
      const title = options.title.replaceAll(' ', '_').toLowerCase();
      return title + '.epub';
    };
    const options: StoreBookDto = {
      uuid: uuid,
      title: storeBookDto.title,
      author: storeBookDto.author,
      cover: storeBookDto.cover,
      description: storeBookDto.description,
      content: storeBookDto.content.map((val) => {
        return {
          title: val.title ? val.title.substring(0, 50) : '-',
          author: val.author,
          content: val.content,
        };
      }),
    };

    try {
      const user = await this.bookRepository.upsert(options);
      const tempPath = temps(uuid + '.json');
      await this.storageService.save(tempPath, JSON.stringify(options));

      const epu = await epub(options, options.content);
      const fileName = getName(options);
      const path = books(fileName);

      await this.storageService.save(path, epu);
      res.status(HttpStatus.OK).json({
        uuid: uuid,
        url: this.storageService.url(fileName),
        user,
        save: true,
      });
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'errror',
      });
    }
  }
}
