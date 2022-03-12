import {ApiProperty} from "@nestjs/swagger";

export class GetAccountForAllCarsResponseDto {
  @ApiProperty({
    description: 'account',
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
