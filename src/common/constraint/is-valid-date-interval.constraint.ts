import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {MILLISECONDS_IN_DAY} from "../constants";
import {MAX_BOOKING_DAYS} from "../constants/busines-logic.constant";

@ValidatorConstraint({ name: 'isBeforeDate', async: false })
export class IsValidDateIntervalConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    const end = new Date(propertyValue);
    const start = new Date(args.object[args.constraints[0]]);

    return (end.getTime() - start.getTime()) / MILLISECONDS_IN_DAY <= MAX_BOOKING_DAYS;
  }

  defaultMessage(args: ValidationArguments) {
    return `Booking interval must be less than ${MAX_BOOKING_DAYS} days.`;
  }
}
