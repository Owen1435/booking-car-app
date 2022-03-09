import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsInt, IsNotEmpty, IsPositive, Validate} from "class-validator";
import {IsBeforeDateConstraint} from "src/common/constraint";
import { IsNotWeekend } from "src/common/constraint/isNotWeekend";

export class BookCarRequestDto {
  @ApiProperty({
    description: 'Date when rent will be start',
    example: '2021-08-16'
  })
  @IsNotEmpty()
  @Validate(IsBeforeDateConstraint, ['endDate'])
  @IsDateString()
  @Validate(IsNotWeekend)
  startDate: string;

  @ApiProperty({
    description: 'Date when rent will be end',
    example: "2021-08-17"
  })
  @IsNotEmpty()
  @IsDateString()
  @Validate(IsNotWeekend)
  endDate: string;

  @ApiProperty({
    description: 'Rate id from db',
    example: 1
  })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  rateId: number;

  @ApiProperty({
    description: 'Auto id from db',
    example: 1
  })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  autoId: number;
}
