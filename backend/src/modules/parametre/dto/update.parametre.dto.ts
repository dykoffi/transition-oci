import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateParametreDto {
  @ApiProperty({ example: 'Rent', description: 'The label of the parameter' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  label?: string;

  @ApiProperty({ example: '30 40 50', description: 'The value of the parameter' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  value?: string;

  @ApiProperty({ example: 'rent', description: 'The code of the parameter' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'finance', description: 'The type of the parameter' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type?: string;

  @ApiProperty({
    example: '2021-10-21T16:29:00',
    description: 'The update timestamp',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  updatedAt: Date;
}
