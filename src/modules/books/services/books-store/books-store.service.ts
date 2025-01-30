import { Injectable } from '@nestjs/common';
import { StoreBookDto } from '../../../../dtos/store-book.dto';
import { books, temps } from '../../../../shared/storage/dtos/Paths';
import epub from 'epub-gen-memory';
import { BookRepositoryService } from '../../../../shared/repositories/book-repository/book-repository.service';
import { AbstractStorageService } from '../../../../shared/storage/services/abstract-storage.service';

@Injectable()
export class BooksStoreService {
  constructor(
    private readonly storage: AbstractStorageService,
    private readonly bookRepository: BookRepositoryService,
  ) {}

  async invoke(uuid: string, storeBookDto: StoreBookDto) {
    const getName = (options: any) => {
      const title = options.title.replaceAll(' ', '_').toLowerCase();
      return title + '.epub';
    };
    const options: StoreBookDto = {
      uuid: uuid,
      title: storeBookDto.title,
      author: storeBookDto.author,
      cover: storeBookDto.cover,
      description: storeBookDto.description,
      content: storeBookDto.content.map((val) => {
        return {
          title: val.title ? val.title.substring(0, 50) : '-',
          author: val.author,
          content: val.content,
        };
      }),
    };
    const insert = {
      ...options,
    };
    await this.bookRepository.upsert(insert);
    const tempPath = temps(uuid + '.json');
    await this.storage.save(tempPath, JSON.stringify(options));

    const epu = await epub(options, options.content);
    const fileName = getName(options);
    const path = books(fileName);

    await this.storage.save(path, epu);
    return {
      data: {
        uuid: uuid,
        url: await this.storage.url(path),
      },
    };
  }
}
