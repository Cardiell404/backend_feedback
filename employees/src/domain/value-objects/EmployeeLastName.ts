import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeeLastName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsThanValidLastName(value);
  }

  private ensureIsThanValidLastName(value: string): void {
    if (!(/^[a-zA-ZÑñ]{3,30}$/.test(value))) {
      throw new InvalidArgumentError(`The Employee last name <${value}> is invalid`);
    }
  }
}
