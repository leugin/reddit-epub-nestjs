import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractStorageService {
  abstract save(path: string, content: any): Promise<boolean>;
  abstract checkExist(path: string): Promise<boolean>;
  abstract url(path: string): Promise<string>;
}
