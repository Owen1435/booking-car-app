import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsPositive, Validate} from "class-validator";
import {IsBeforeDateConstraint, IsValidDateConstraint} from "src/common/constraint";
import { IsWeekend } from "src/common/constraint/isWeekend";

export class BookCarRequestDto {
  @ApiProperty({
    description: 'Date when rent will be start',
    example: '2021-08-16'
  })
  @IsNotEmpty()
  @Validate(IsBeforeDateConstraint, ['endDate'])
  @Validate(IsValidDateConstraint)
  @Validate(IsWeekend)
  startDate: string;

  @ApiProperty({
    description: 'Date when rent will be end',
    example: "2021-08-17"
  })
  @IsNotEmpty()
  @Validate(IsValidDateConstraint)
  @Validate(IsWeekend)
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
