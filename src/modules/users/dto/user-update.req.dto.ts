import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'User first name', example: 'admin' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: 'User second name', example: 'admin' })
  @IsNotEmpty()
  second_name: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'admin@admin.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
