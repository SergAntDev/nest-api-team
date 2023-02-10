import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './users.service';
import { CreateUserDto } from './dto/user-create.req.dto';
import { UpdateUserDto } from './dto/user-update.req.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Requests } from '../requests/requests.entity';
import { SETTINGS } from 'src/modules/users/pipes/user-create.pipe';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('requests')
  async findUserRequests(@Request() req): Promise<Requests[]> {
    return await this.userService.getRequests(req.user);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.getUser({ where: { id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
