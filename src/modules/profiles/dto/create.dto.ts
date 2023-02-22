import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, Validate } from 'class-validator';

import { Departments } from 'src/modules/departments/departments.entity';
import { Positions } from 'src/modules/positions/positions.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateProfileDto {
  @Allow()
  @ApiProperty({ description: 'Profile phone', example: '+8888888888' })
  phone?: string | null;

  @ApiProperty({ description: 'Profile Slack Id', example: '1' })
  @Allow()
  slackId?: string | null;

  @ApiProperty({ description: 'Position', type: Positions })
  @Allow()
  @IsOptional()
  @Validate(IsExist, ['Positions', 'id'], {
    message: 'Position not exists',
  })
  position?: Positions | null;

  @ApiProperty({ description: 'Department', type: Departments })
  @Allow()
  @IsOptional()
  @Validate(IsExist, ['Departments', 'id'], {
    message: 'Department not exists',
  })
  department?: Departments | null;

  @ApiProperty({
    description: 'When user was born',
    example: '2023-02-08 11:51:24',
    format: 'date-time',
  })
  @Allow()
  birthDate?: Date | null;

  @ApiProperty({
    description: 'When user was hired',
    example: '2023-02-08 11:51:24',
    format: 'date-time',
  })
  @Allow()
  hiredDate?: Date | null;
}
