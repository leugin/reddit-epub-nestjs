import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '../../../shared/repositories/user-repository/create-user.dto';
import { UserRepositoryService } from '../../../shared/repositories/user-repository/user-repository.service';
import { Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { ResponseStatusCode } from '../../../shared/enums/response-status-code';
import { JwtService } from '@nestjs/jwt';

@Controller('api/v1/auth')
export class LoginController {

  constructor(private readonly userService: UserRepositoryService, private readonly jwt:JwtService) {
  }
  @Post('login')
  async loginByPassword(
    @Body() body: {email: string, password: string},
    @Res() res: Response  ) {
    const user = await this.userService.findOne({
      where: {
        email: body.email,
      }
    });
    if (!user) {
      res.status(ResponseStatusCode.UNAUTHORIZED).json({
        message: 'unauthorized',
      });
      return;
    }
    const isPasswordValid = await bcryptjs.compare(body.password, user.password);
    if (!isPasswordValid) {
      res.status(ResponseStatusCode.UNAUTHORIZED).json({
        message: 'unauthorized',
      });
      return;

    }

    res.status(ResponseStatusCode.OK).json({
      access_token: await this.jwt.signAsync({
        sub: user.id,
        email: user.email,
        name: user.name,
      })

    });
  }
}
