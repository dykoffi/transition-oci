import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createParametreDto {
    @ApiProperty({ example: 'Rent', description: 'The label of the parameter' })
    @IsNotEmpty()
    @IsString()
    label: string;
    
    @ApiProperty({ example: 'rent', description: 'The code of the parameter' })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({ example: 'finance', description: 'The code of the paraemter' })
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty({ example: '10 20 30 40', description: 'The value of the paraemter' })
    @IsNotEmpty()
    @IsString()
    value: string;

   
}