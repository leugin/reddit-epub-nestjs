import { Test, TestingModule } from '@nestjs/testing';
import { BooksStoreService } from './books-store.service';

describe('BooksStoreService', () => {
  let service: BooksStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksStoreService],
    }).compile();

    service = module.get<BooksStoreService>(BooksStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
