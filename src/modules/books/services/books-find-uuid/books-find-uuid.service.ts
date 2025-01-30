import { Injectable, NotFoundException } from '@nestjs/common';
import { temps } from '../../../../shared/storage/dtos/Paths';
import { AbstractStorageService } from '../../../../shared/storage/services/abstract-storage.service';

@Injectable()
export class BooksFindUuidService {
  constructor(private readonly storageService: AbstractStorageService) {}

  async invoke(uuid: string) {
    const path = temps(uuid) + '.json';

    const exists = await this.storageService.checkExist(path);
    if (!exists) {
      throw new NotFoundException('resource missing');
    }
    try {
      const fileContent = await this.storageService.getFile(path);
      return JSON.parse(fileContent); // Convierte el contenido en un objeto JSON
    } catch (e) {
      console.log('errro', e);
      throw new NotFoundException('Bad error');
    }
  }
}
