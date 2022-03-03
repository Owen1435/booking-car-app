import {ApiProperty} from "@nestjs/swagger";

export class CalculatePriceResponseDto {
  @ApiProperty({
    description: 'Count of day',
    example: 9
  })
  days: number;

  @ApiProperty({
    description: 'Price for rent',
    example: 100
  })
  price: number;

  @ApiProperty({
    description: 'Rate id',
    example: 1
  })
  rate: number;

  @ApiProperty({
    description: 'Discount',
    example: 5
  })
  discount: number;
}

