import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsInt, IsNotEmpty, IsPositive, Validate} from "class-validator";
import {IsBeforeDateConstraint} from "../../../../common/constraint";

export class CalculatePriceRequestDto {
  @ApiProperty({
    description: 'Date when rent will be start',
    example: '2021-03-05'
  })
  @IsNotEmpty()
  @Validate(IsBeforeDateConstraint, ['endDate'])
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Date when rent will be end',
    example: '2022-03-15'
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Rate id from db',
    example: 1
  })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  rateId: number;
}
