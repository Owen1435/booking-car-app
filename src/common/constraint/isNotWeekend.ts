import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isWeekend', async: false })
export class IsNotWeekend implements ValidatorConstraintInterface {
  validate(propertyValue: string) {
    const date = new Date(propertyValue);
    const weekendIndex = [0, 6]
    return !weekendIndex.includes(date.getDay());
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Booking must not be on weekend';
  }
}