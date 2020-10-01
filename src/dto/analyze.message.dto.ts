import { IsString } from 'class-validator';

export class AnalyzeMessageDto {
  @IsString()
  message: string;
}
