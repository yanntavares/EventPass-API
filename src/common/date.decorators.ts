import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateEventDto } from 'src/events/dto/create-event.dto';

@ValidatorConstraint({ name: 'IsDateInFuture', async: false })
export class IsDateInFutureConstraint implements ValidatorConstraintInterface {
  validate(date: Date): boolean {
    return date >= new Date();
  }

  defaultMessage(): string {
    return 'A data deve ser posterior à data atual';
  }
}

export function IsDateInFuture(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateInFutureConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsGreaterThan', async: false })
export class IsDateInPastConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string | Date, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints as (keyof CreateEventDto)[];
    const relatedValue = (args.object as CreateEventDto)[relatedPropertyName];

    if (!propertyValue || !relatedValue) return false;

    return new Date(propertyValue) > new Date(relatedValue);
  }
  defaultMessage(): string {
    return 'A data de término deve ser posterior à data de início';
  }
}

export function IsGreaterThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsDateInPastConstraint,
    });
  };
}
