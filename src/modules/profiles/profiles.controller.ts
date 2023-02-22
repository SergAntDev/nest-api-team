import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfilesService) {}
}
