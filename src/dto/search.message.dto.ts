import { IsString } from 'class-validator';

export class SearchMessageDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}
