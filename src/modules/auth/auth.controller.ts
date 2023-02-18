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
  ApiOkResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';

import { SETTINGS } from 'src/modules/users/pipes/user-create.pipe';
import { RequestWithUser } from 'src/interfaces/request-user.interface';
import { AuthUser } from '../users/decorator/users.decorator';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from '../users/dto/user-create.req.dto';
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
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(
    @Request() req: RequestWithUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() login: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(req.user);
  }

  @HttpCode(200)
  @Post('signup')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiOkResponse({ type: User, description: 'Successfully created user' })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(
    @Body(SETTINGS.VALIDATION_PIPE)
    newUser: CreateUserDto,
  ) {
    return this.authService.register(newUser);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'A user has been successfully fetched',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  me(@AuthUser() user: User): User {
    return user;
  }
}
