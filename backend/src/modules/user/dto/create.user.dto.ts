import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
    @ApiProperty({ example: 'test', description: 'Identifier' })
    @IsNotEmpty()
    @IsString()
    identifier: string;
    
    @ApiProperty({ example: '', description: 'Password' })
    @IsNotEmpty()
    @IsString()
    password: string;
   
}