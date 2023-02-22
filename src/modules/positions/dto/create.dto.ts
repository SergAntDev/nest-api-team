import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({ description: 'Position name', example: 'Position' })
  @IsNotEmpty()
  name: string;
}
