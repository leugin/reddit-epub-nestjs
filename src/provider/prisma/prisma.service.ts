import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { paginate } from 'prisma-extension-pagination';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$extends({
      model: {
        book: {
          paginate,
        },
      },
    });
  }
}
