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



}
