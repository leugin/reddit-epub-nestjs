import { Body, Controller, Post } from '@nestjs/common';
import { UserRepositoryService } from '../../../shared/repositories/user-repository/user-repository.service';
import { CreateUserDto } from '../../../shared/repositories/user-repository/create-user.dto';

@Controller('api/v1/auth')
export class RegisterController {
  constructor(private readonly userService: UserRepositoryService) {}

  @Post('register')
  async register(
    @Body() body: CreateUserDto,
  ) {
    const user = await this.userService.create(body);
    return { message: 'register', data: user };
  }
}
