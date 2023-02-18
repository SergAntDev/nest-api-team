import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RequestWithUser } from 'src/interfaces/request-user.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Roles } from '../users/decorator/roles.decorator';
import { RolesGuard } from '../users/guard/roles.guard';
import { CreateRequestDto } from './dto/create.dto';
import { RequestsService } from './request.service';
import { Requests } from './requests.entity';

@ApiTags('Requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('requests')
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse({
    status: 200,
    description: 'A requests has been successfully fetched',
    type: Requests,
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(): Promise<Requests[]> {
    return this.requestsService.getAll();
  }

  @Get('my')
  @ApiOkResponse({
    status: 200,
    description: 'A my requests has been successfully fetched',
    type: Requests,
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findMy(@Request() req: RequestWithUser): Promise<Requests[]> {
    return this.requestsService.getMy(req.user);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({
    status: 200,
    description: 'A user requests has been successfully fetched',
    type: Requests,
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findUserRequests(@Param('id', ParseIntPipe) id: string): Promise<Requests[]> {
    return this.requestsService.getForUser({ where: { id } });
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Successfully created request',
    type: Requests,
  })
  @ApiBadRequestResponse({ description: 'Something went wrong' })
  async create(
    @Request() req: RequestWithUser,
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    newRequest: CreateRequestDto,
  ): Promise<Requests> {
    const user = req.user;
    return await this.requestsService.create(user, newRequest);
  }
}
