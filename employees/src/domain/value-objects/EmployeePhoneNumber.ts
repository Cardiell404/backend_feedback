import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeePhoneNumber extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsThanValidPhoneNumber(value);
  }

  private ensureIsThanValidPhoneNumber(value: string) {
    if (!(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value))) {
      throw new InvalidArgumentError(`The Employee phone number <${value}> is invalid`);
    }
  }
}
