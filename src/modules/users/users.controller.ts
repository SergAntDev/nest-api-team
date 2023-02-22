import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/user-create.req.dto';
import { UpdateUserDto } from './dto/user-update.req.dto';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserRoles } from './enums/users.enum';
import { RolesSelfGuard } from './guard/roles-self.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SUPERADMIN)
  @ApiCreatedResponse({
    description: 'Successfully created user',
    type: User,
  })
  @ApiBadRequestResponse({
    description: "Can't create user. Try again!",
    type: User,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SUPERADMIN)
  @ApiCreatedResponse({
    status: 200,
    description: 'A users has been successfully fetched',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong',
    type: User,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a user that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'A user has been successfully fetched',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'A user with given id does not exist.',
  })
  findById(@Param('id', ParseIntPipe) id: string) {
    return this.userService.getUser({ where: { id } });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesSelfGuard)
  @Roles(UserRoles.SUPERADMIN)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a user that exists in the database',
    type: String,
  })
  @ApiCreatedResponse({
    status: 200,
    description: 'A user has been successfully fetched',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'A user with given id does not exist.',
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SUPERADMIN)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a user that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'A user has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'A user with given id does not exist.',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(id);
  }
}
