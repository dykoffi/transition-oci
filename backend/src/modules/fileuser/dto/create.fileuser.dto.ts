import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileUserDto {
  @ApiProperty({ example: '12345', description: 'The ETag of the file' })
  @IsNotEmpty()
  @IsString()
  fileEtag: string;
  
  @ApiProperty({ example: '12345', description: 'The ID of the user' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: '2021-10-21T16:29:00',
    description: 'The creation timestamp',
    required: false,
  })
  @IsDate()
  createdAt?: string | Date;

  @ApiProperty({
    example: '2021-10-21T16:29:00',
    description: 'The update timestamp',
    required: false,
  })
  @IsDate()
  updatedAt?: string | Date;
}
