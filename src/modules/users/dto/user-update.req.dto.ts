import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';

import { CreateProfileDto } from 'src/modules/profiles/dto/create.dto';

export class UpdateUserDto {
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
    description: 'User Profile',
    type: CreateProfileDto,
  })
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile?: CreateProfileDto | null;
}
