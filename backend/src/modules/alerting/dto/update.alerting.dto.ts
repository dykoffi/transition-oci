import { TypeFichier } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';

export class UpdateOpexDto {
  @IsArray()
  @ApiProperty({
    example: ['email@example.com'],
    description: 'An array of email addresses to receive the alert',
  })
  email?: string[];

  @IsArray()
  @ApiProperty({
    example: ['telephone@example.com'],
    description: 'An array of email addresses to receive the alert',
  })
  telephone?: string[];

  @IsEnum(TypeFichier)
  @ApiProperty({
    enum: TypeFichier,
    example: TypeFichier.ACTION_COM,
    description: 'The type of file to be uploaded',
  })
  typeFichier: TypeFichier;

  user: string;
}
