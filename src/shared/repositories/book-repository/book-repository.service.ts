import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import { StoreBookDto } from '../../../dtos/store-book.dto';

@Injectable()
export class BookRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: StoreBookDto) {
    return this.prisma.book.create({
      data: {
        uuid: data.uuid,
        title: data.title,
        author: data.author,
        cover: data.cover,
        description: data.description,
        contents: {
          create: data.content.map((content) => ({
            title: content.title,
            author: content.author,
            content: content.content,
          })),
        },
      },
    });
  }
  async upsert(data: StoreBookDto) {
    return this.prisma.$transaction(async (tx) => {
      const old = await tx.book.findFirst({
        where: {
          uuid: data.uuid,
        },
      });

      const book = await tx.book.upsert({
        where: {
          uuid: data.uuid,
        },
        create: {
          uuid: data.uuid,
          title: data.title,
          author: data.author,
          cover: data.cover,
          description: data.description,
        },
        update: {
          title: data.title,
          author: data.author,
          cover: data.cover,
          description: data.description,
        },
      });

      if (old) {
        await tx.bookContent.deleteMany({
          where: {
            book_id: book.id,
          },
        });
      }

      // Create new content with proper type definition
      await tx.bookContent.createMany({
        data: data.content.map((content) => {
          return {
            book_id: book.id,
            title: content.title,
            // Only include fields that are defined in your Prisma schema
            content: content.content,
          };
        }),
      });

      return book;
    });
  }
}
