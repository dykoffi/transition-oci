import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CoordsDto } from './coords.dto';
import { PerformanceDto } from './performance.dto';

export class CreateActionDto {

  @IsNotEmpty()
  date_deb: Date;
  
  @IsNotEmpty()
  date_fin: Date;

  @IsNotEmpty()
  @IsString()
  localite: string;

  @IsNotEmpty()
  @IsString()
  nb_rh: string;

  @IsOptional()
  @IsString()
  new_quartier?: string;

  @IsNotEmpty()
  @IsString()
  nom_action: string;

  @IsNotEmpty()
  @IsString()
  partners: string;

  @IsNotEmpty()
  @IsString()
  perimetre: string;

  @IsNotEmpty()
  @IsString()
  quartier: string;

  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsString()
  ville: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordsDto)
  coords?: CoordsDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PerformanceDto)
  performance: PerformanceDto[];

  files: any[];
}
