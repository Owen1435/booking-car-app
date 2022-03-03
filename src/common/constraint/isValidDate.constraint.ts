import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({ name: 'isValidDate', async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
    validate(propertyValue: string, args: ValidationArguments) {
        const date = new Date(propertyValue)

        if (!date.getTime()) {
            return false;
        }

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        return day > 0 && day <= monthLength[month - 1];
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid date';
    }
}
