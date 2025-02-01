import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { books } from '../../../../shared/storage/dtos/Paths';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { AbstractStorageService } from '../../../../shared/storage/services/abstract-storage.service';

@Injectable()
export class BooksDownloadService {
  constructor(private readonly storageService: AbstractStorageService) {}
  async invoke(filename: string, res: Response) {
    const path = books(filename);

    const exists = await this.storageService.checkExist(path);
    if (!exists) {
      throw new NotFoundException('file missing');
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
