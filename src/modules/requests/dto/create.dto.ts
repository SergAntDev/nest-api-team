import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'Request reason', example: 'reason' })
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    description: 'Request comment',
    example: 'comment',
    maxLength: 1000,
  })
  @Length(0, 1000)
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ description: 'Date', type: String, format: 'date-time' })
  @IsNotEmpty()
  date: Date;
}
