import {ApiProperty} from "@nestjs/swagger";

export class AccountForEachCarResponseDto {
  @ApiProperty({
    description: 'Percent loud of car by day',
    example: '15.3'
  })
  percent: number;

  @ApiProperty({
    description: 'Percent loud of car by day',
    example: 'Monday'
  })
  day: string;
}
