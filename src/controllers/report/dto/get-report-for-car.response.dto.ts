import {ApiProperty} from "@nestjs/swagger";

export class GetReportForCarResponseDto {
  @ApiProperty({
    description: 'Car id',
    example: 1
  })
  carId: number;

  @ApiProperty({
    description: 'report',
    example: [{
      day: 'Monday',
      percent: 25
    }]
  })
  data: {
    day: string;
    percent: number;
  }[]
}
