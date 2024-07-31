import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeeNss extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsThanValidNss(value);
  }

  private ensureIsThanValidNss(value: string) {
    if(!(/^[0-9]{11}$/.test(value))) {
      throw new InvalidArgumentError(`The Employee nss <${value}> is not 11 characters`);
    }
  }
}
