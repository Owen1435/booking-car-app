import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsInt, IsNotEmpty, IsPositive, Validate} from "class-validator";
import {IsBeforeDateConstraint} from "src/common/constraint";
import { IsNotWeekend } from "src/common/constraint/is-not-weekend";
import {IsValidDateIntervalConstraint} from "../../../common/constraint/is-valid-date-interval.constraint";

export class BookCarRequestDto {
  @ApiProperty({
    description: 'Date when rent will be start',
    example: '2021-08-16'
  })
  @IsNotEmpty()
  @IsDateString()
  @Validate(IsBeforeDateConstraint, ['endDate'])
  @Validate(IsNotWeekend)
  startDate: string;

  @ApiProperty({
    description: 'Date when rent will be end',
    example: "2021-08-17"
  })
  @IsNotEmpty()
  @IsDateString()
  @Validate(IsValidDateIntervalConstraint, ['startDate'])
  @Validate(IsNotWeekend)
  endDate: string;

  @ApiProperty({
    description: 'Price id from db',
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
  carId: number;
}
