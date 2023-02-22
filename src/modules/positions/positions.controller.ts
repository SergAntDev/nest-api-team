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
import { CreatePositionDto } from './dto/create.dto';
import { Positions } from './positions.entity';
import { PositionsService } from './positions.service';

@ApiTags('Positions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('positions')
export class PositionsController {
  constructor(private positionsService: PositionsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.SUPERADMIN)
  @ApiCreatedResponse({
    status: 200,
    description: 'A departmnets has been successfully fetched',
    type: Positions,
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(): Promise<Positions[]> {
    return this.positionsService.getAll();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.SUPERADMIN)
  @ApiCreatedResponse({
    description: 'Successfully created request',
    type: Positions,
  })
  @ApiBadRequestResponse({ description: 'Something went wrong' })
  async create(
    @Request() req: RequestWithUser,
    @Body()
    newStatus: CreatePositionDto,
  ): Promise<Positions> {
    return await this.positionsService.create(newStatus);
  }
}
