import {ApiProperty} from "@nestjs/swagger";

export class GetReportForAllCarsResponseDto {
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
