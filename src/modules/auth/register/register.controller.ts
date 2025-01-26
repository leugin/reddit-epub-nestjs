import { Body, Controller, Post } from '@nestjs/common';
import { UserRepositoryService } from '../../../shared/repositories/user-repository/user-repository.service';
import { CreateUserDto } from '../../../shared/repositories/user-repository/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('api/v1/auth')
export class RegisterController {
  constructor(
    private readonly userService: UserRepositoryService,
    private readonly jwt: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return {
      data: {
        access_token: await this.jwt.signAsync({
          sub: user.id,
          email: user.email,
          name: user.name,
        }),
        user: {
          email: user.email,
          name: user.name,
        },
      },
    };
  }
}
