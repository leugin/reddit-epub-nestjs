import { Controller, Get, Query } from '@nestjs/common';
import RedditFindDto from '../dtos/reddit-find.dto';
import { RedditFindAllService } from '../services/reddit-find-all/reddit-find-all.service';

@Controller()
export class RedditController {
  constructor(private readonly findAllService: RedditFindAllService) {}
  @Get('/api/v1/reddit/find')
  async findAll(@Query() params: RedditFindDto) {
    const uuid = await this.findAllService.invoke(params);
    return {
      data: { uuid },
    };
  }
}
