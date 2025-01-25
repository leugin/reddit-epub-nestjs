import { Module } from '@nestjs/common';
import { PrismaService } from '../../provider/prisma/prisma.service';
import { BookRepositoryService } from './book-repository/book-repository.service';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { IsUniqueConstraint } from '../custom-validations/is-unique.constraint';

@Module({
  providers: [PrismaService, BookRepositoryService, UserRepositoryService, IsUniqueConstraint],
  exports: [BookRepositoryService, UserRepositoryService],
})
export class RepositoriesModule {}
