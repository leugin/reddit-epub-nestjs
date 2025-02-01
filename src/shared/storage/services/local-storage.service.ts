import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import { AbstractStorageService } from './abstract-storage.service';
import * as process from 'node:process';
import { readFileSync } from 'fs';

@Injectable()
export class LocalStorageService extends AbstractStorageService {
  async save(path: string, content: any): Promise<boolean> {
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
  async checkExist(path: string): Promise<boolean> {
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

  getFile(path: string): Promise<any> {
    const fileContent = readFileSync(path, 'utf8'); // Lee el contenido del archivo
    return Promise.resolve(fileContent);
  }
}
