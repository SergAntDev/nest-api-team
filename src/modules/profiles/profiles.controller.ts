import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Profiles } from './profiles.entity';

import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfilesService) {}

  @Get()
  @ApiCreatedResponse({
    status: 200,
    description: 'A profiles has been successfully fetched',
    type: Profiles,
  })
  @ApiBadRequestResponse({
    description: 'Something went wrong',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(): Promise<Profiles[]> {
    return this.profileService.getAll();
  }
}
