import { Injectable } from '@nestjs/common';
import { clearPost, createTempEpub } from '../../tools/reddit-tools';
import * as crypto from 'crypto';
import { temps } from '../../../../shared/storage/dtos/Paths';
import { RedditService } from '../../../../provider/reddit/reddit.service';
import RedditFindDto from '../../dtos/reddit-find.dto';
import { AbstractStorageService } from '../../../../shared/storage/services/abstract-storage.service';

@Injectable()
export class RedditFindAllService {
  constructor(
    private readonly reeditService: RedditService,
    private readonly storageService: AbstractStorageService,
  ) {}
  async invoke(params: RedditFindDto) {
    const body = await this.reeditService.findAll(
      params.sub_reddit,
      params.search,
    );
    const clearedPost = clearPost(body);

    const tempEpub = createTempEpub(clearedPost, {
      title: params.title || params.search,
      author: params.search,
    });

    const uuid = crypto.randomUUID();
    const path = temps(uuid);
    await this.storageService.save(path + '.json', JSON.stringify(tempEpub));
    return uuid;
  }
}
