import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeeRfc extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsThanValidRfc(value);
  }

  private ensureIsThanValidRfc(value: string) {
    if(!(/^([a-zA-Z,Ññ,&]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-zA-Z]{3})$/)) {
      throw new InvalidArgumentError(`The Employee rfc <${value}> is invalid`);
    }
  }
}
