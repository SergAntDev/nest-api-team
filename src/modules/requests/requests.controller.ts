import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RequestWithUser } from 'src/interfaces/request-user.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateRequestDto } from './dto/create.dto';
import { RequestsService } from './request.service';
import { Requests } from './requests.entity';

@ApiTags('Requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('requests')
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @ApiBearerAuth()
  @Get()
  findAll(): Promise<Requests[]> {
    return this.requestsService.getAll();
  }

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({
    description: 'Created user request',
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
