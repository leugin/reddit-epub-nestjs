import { Injectable } from '@nestjs/common';
import { save as SaveFile, getUrl } from './aws';
@Injectable()
export class AwsStorageService {
  async save(path: string, content: any) {
    return new Promise(async (resolve) => {
      const response = await SaveFile(path, content);
      resolve(response);
    });
  }
  async url(path: string) {
    return new Promise<string>(async (resolve) => {
      const url = await getUrl(path);
      resolve(url);
    });
  }
}
