import { Injectable, NotFoundException } from '@nestjs/common';
import { temps } from '../../../../provider/storage/dtos/Paths';
import { readFileSync } from 'fs';
import { StorageService } from '../../../../provider/storage/storage.service';

@Injectable()
export class BooksFindUuidService {
  constructor(private readonly storageService: StorageService) {}

  async invoke(uuid: string) {
    const path = temps(uuid) + '.json';

    const exists = await this.storageService.checkExist(path);
    if (!exists) {
      throw new NotFoundException('resource missing');
    }
    try {
      const fileContent = readFileSync(path, 'utf8'); // Lee el contenido del archivo
      return JSON.parse(fileContent); // Convierte el contenido en un objeto JSON
    } catch (e) {
      console.log('errro', e);
      throw new NotFoundException('Bad error');
    }
  }
}
