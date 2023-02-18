import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ description: 'Profile phone', example: '+8888888888' })
  phone: string;

  @ApiProperty({ description: 'Profile Slack Id', example: '1' })
  slackId: string;

  @ApiProperty({ description: 'Position', example: 'developer' })
  position: string;

  @ApiProperty({ description: 'Department', example: 'developers' })
  department: string;

  @ApiProperty({
    description: 'When user was born',
    example: '2023-02-08 11:51:24',
    format: 'date-time',
  })
  birthDate: Date;

  @ApiProperty({
    description: 'When user was hired',
    example: '2023-02-08 11:51:24',
    format: 'date-time',
  })
  hiredDate: Date;
}
