import {ApiProperty} from "@nestjs/swagger";

export class GetCarResponseDto {
  @ApiProperty({
    description: 'Id from db',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Mark of car',
    example: 'nissan'
  })
  brand: string;

  @ApiProperty({
    description: 'Model of car',
    example: 'gtr'
  })
  model: string;

  @ApiProperty({
    description: 'License on car',
    example: 'WAUDF78E86A074839'
  })
  license_plate: string;

  @ApiProperty({
    description: 'ID number of car',
    example: 'WAUDF78E86A074839'
  })
  vin: string;
}
