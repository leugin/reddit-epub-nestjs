import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../provider/prisma/prisma.service';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateUserDto) {
    const hasPass = await bcryptjs.hash(data.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hasPass,
      },
    });
    return Promise.resolve(user);
  }
}
