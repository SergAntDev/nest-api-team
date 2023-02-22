import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Status name', example: 'Status' })
  @IsNotEmpty()
  name: string;
}
