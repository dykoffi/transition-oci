import { ApiProperty } from '@nestjs/swagger';

export class CreateACtivityLogDto {
  @ApiProperty()
  label: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  level: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  user: string;
}
