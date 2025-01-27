import { Test, TestingModule } from '@nestjs/testing';
import { BooksFindAllService } from './books-find-all.service';

describe('BooksFindAllService', () => {
  let service: BooksFindAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksFindAllService],
    }).compile();

    service = module.get<BooksFindAllService>(BooksFindAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
