import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class FileRegisterDto {

  @ApiProperty({
    example: 'folder_name',
    description: 'The name of the folder where the file is saved',
  })
  @IsNotEmpty()
  @IsString()
  folder: string;

  @ApiProperty({
    example: 'user_id',
    description: 'The ID of the user who uploaded the file',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    example: '{year:2021,month:01} or [{year:2021,month:01},{year:2022,month:03}]',
    description: 'The date range of the file',
  })
  @IsNotEmpty()
  @IsString()
  date_range: string;
  
}
