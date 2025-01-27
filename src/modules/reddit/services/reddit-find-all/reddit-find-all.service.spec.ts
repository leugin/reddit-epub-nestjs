import { Test, TestingModule } from '@nestjs/testing';
import { RedditFindAllService } from './reddit-find-all.service';

describe('RedditFindAllService', () => {
  let service: RedditFindAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedditFindAllService],
    }).compile();

    service = module.get<RedditFindAllService>(RedditFindAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
