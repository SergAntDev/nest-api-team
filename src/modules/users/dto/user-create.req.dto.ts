import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

import { CreateProfileDto } from 'src/modules/profiles/dto/create.dto';
import { MESSAGES, REGEX } from 'src/modules/users/pipes/user-create.pipe';
import { Match } from '../decorator/match.decorator';

export class CreateUserDto {
  @ApiProperty({ description: 'User first name', example: 'admin' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User second name', example: 'admin' })
  @IsNotEmpty()
  secondName: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'admin@admin.com',
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: '12345678',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: 'Confirm the password',
    example: '12345678',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  @Match('password')
  confirm: string;

  @ApiProperty({
    description: 'User Profile',
    type: CreateProfileDto,
  })
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile?: CreateProfileDto | null;
}
