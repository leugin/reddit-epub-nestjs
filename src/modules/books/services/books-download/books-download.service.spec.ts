import { Test, TestingModule } from '@nestjs/testing';
import { BooksDownloadService } from './books-download.service';

describe('BooksDownloadService', () => {
  let service: BooksDownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksDownloadService],
    }).compile();

    service = module.get<BooksDownloadService>(BooksDownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
