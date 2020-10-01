import { IsAlpha, IsString } from 'class-validator';

export class CreateTermDto {
  @IsString()
  @IsAlpha()
  term: string;
}
