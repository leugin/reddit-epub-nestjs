import { Injectable } from '@nestjs/common';
import { get, getUrl, save as SaveFile } from './index';
import { AbstractStorageService } from '../abstract-storage.service';
@Injectable()
export class AwsStorageService extends AbstractStorageService {
  async save(path: string, content: any): Promise<boolean> {
    return new Promise(async (resolve) => {
      await SaveFile(path, content);
      resolve(true);
    });
  }
  async url(path: string) {
    return new Promise<string>(async (resolve) => {
      const url = await getUrl(path);
      resolve(url);
    });
  }

  checkExist(): Promise<boolean> {
    return Promise.resolve(true);
  }
  static provider = () => {
    return {
      provide: AbstractStorageService,
      useClass: AwsStorageService,
    };
  };

  async getFile(path: string): Promise<string> {
    return await get(path);
  }
}
