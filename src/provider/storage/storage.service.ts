import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';

@Injectable()
export class StorageService {

  async  save(path:string, content:any) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    })
  }
}
