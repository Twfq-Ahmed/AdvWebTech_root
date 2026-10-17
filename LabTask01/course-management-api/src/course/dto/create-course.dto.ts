import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Matches,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]{2,3}\d{3,4}$/, {
    message:
      'Course code must be in the format of 2-3 letters followed by 3-4 digits e.g. CS101 or CSC4161',
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  instructor: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(6)
  credits: number;

  @IsString()
  @IsOptional()
  description: string;
}
