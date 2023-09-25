import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateACtivityLogDto {

  @ApiPropertyOptional()
  label?: string;
  @ApiPropertyOptional()
  type?: string;
  @ApiPropertyOptional()
  level?: string;
  @ApiPropertyOptional()
  code?: string;
  @ApiPropertyOptional()
  user?: string;

}
