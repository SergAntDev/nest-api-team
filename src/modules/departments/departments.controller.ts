import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RequestWithUser } from 'src/interfaces/request-user.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Roles } from '../users/decorator/roles.decorator';
import { UserRoles } from '../users/enums/users.enum';
import { RolesGuard } from '../users/guard/roles.guard';
import { Departments } from './departments.entity';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create.dto';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentController {
  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.SUPERADMIN)
  @ApiCreatedResponse({
    status: 200,
    description: 'A departmnets has been successfully fetched',
    type: Departments,
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(): Promise<Departments[]> {
    return this.departmentsService.getAll();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.SUPERADMIN)
  @ApiCreatedResponse({
    description: 'Successfully created request',
    type: Departments,
  })
  @ApiBadRequestResponse({ description: 'Something went wrong' })
  async create(
    @Request() req: RequestWithUser,
    @Body()
    newStatus: CreateDepartmentDto,
  ): Promise<Departments> {
    return await this.departmentsService.create(newStatus);
  }
}
