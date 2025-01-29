import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';

@Injectable()
export class StorageService {
  async save(path: string, content: any) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
  async checkExist(path: string) {
    return new Promise((resolve) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async url(path: string) {
    return `${process.env.STORAGE_URL}/${path}`;
  }
}
