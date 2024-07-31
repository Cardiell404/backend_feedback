import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeeName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsThanValidName(value);
  }

  private ensureIsThanValidName(value: string): void {
    if (!(/^[a-zA-ZÑñ]{3,30}$/.test(value))) {
      throw new InvalidArgumentError(`The Employee name <${value}> is invalid`);
    }
  }
}
