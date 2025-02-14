import { Test, TestingModule } from '@nestjs/testing';
import { BooksUpdateService } from './books-update.service';

describe('BooksStoreService', () => {
  let service: BooksUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksUpdateService],
    }).compile();

    service = module.get<BooksUpdateService>(BooksUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
