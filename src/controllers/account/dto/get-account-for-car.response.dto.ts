import {ApiProperty} from "@nestjs/swagger";

export class GetAccountForCarResponseDto {
  @ApiProperty({
    description: 'Car id',
    example: 1
  })
  carId: number;

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
