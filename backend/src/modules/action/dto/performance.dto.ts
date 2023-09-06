import { IsNotEmpty, IsString } from 'class-validator';
export class PerformanceDto {
    
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
