import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from '../../../../provider/storage/storage.service';
import { books } from '../../../../provider/storage/dtos/Paths';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Injectable()
export class BooksDownloadService {
  constructor(private readonly storageService: StorageService) {}
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
