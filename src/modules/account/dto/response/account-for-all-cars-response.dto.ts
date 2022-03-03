import {ApiProperty} from "@nestjs/swagger";

export class AccountForAllCarsResponseDto {
  @ApiProperty({
    description: 'Percent loud of car by day',
    example: '15.3'
  })
  percent: number;

  @ApiProperty({
    description: 'Day of week',
    example: 'Monday'
  })
  day: string;
}
