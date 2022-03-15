import { Car } from '@car/domain/car';

export class GetCarResponseDto implements Car {
  id: number;
  brand: string;
  model: string;
  licensePlate: string;
  vin: string;
}
