import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateUserDto {
  @ApiProperty({ example: 'test', description: 'Identifier' })
  @IsNotEmpty()
  @IsString()
  identifier?: string;
  
  @ApiProperty({ example: '', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  password?: string;


  @ApiProperty({ example: '2/02/2022', description: 'last login date' })
  @IsDate()
  lastLoginAt?: Date


}
