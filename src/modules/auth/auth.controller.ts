import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from '../users/decorator/users.decorator';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from '../users/dto/user-create.req.dto';
import { SETTINGS } from 'src/app.utils';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiCreatedResponse({
    description: 'Signin',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User exists. Try again!', type: User })
  async login(
    @Request() req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() login: LoginDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @HttpCode(200)
  @Post('signup')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async register(
    @Body(SETTINGS.VALIDATION_PIPE)
    newUser: CreateUserDto,
  ) {
    return this.authService.register(newUser);
  }

  @ApiBearerAuth()
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }
}
