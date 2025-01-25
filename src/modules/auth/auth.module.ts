import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { UserRepositoryService } from '../../shared/repositories/user-repository/user-repository.service';
import { PrismaService } from '../../provider/prisma/prisma.service';

@Module({
  controllers: [RegisterController],
  imports: [],
  providers: [PrismaService, UserRepositoryService],
})
export class AuthModule {}
