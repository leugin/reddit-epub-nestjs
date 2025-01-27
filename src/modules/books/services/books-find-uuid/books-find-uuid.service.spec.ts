import { Test, TestingModule } from '@nestjs/testing';
import { BooksFindUuidService } from './books-find-uuid.service';

describe('BooksFindUuidService', () => {
  let service: BooksFindUuidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksFindUuidService],
    }).compile();

    service = module.get<BooksFindUuidService>(BooksFindUuidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
