import { Test, TestingModule } from '@nestjs/testing';
import { BookRepositoryService } from './book-repository.service';

describe('BookRepositoryService', () => {
  let service: BookRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookRepositoryService],
    }).compile();

    service = module.get<BookRepositoryService>(BookRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
