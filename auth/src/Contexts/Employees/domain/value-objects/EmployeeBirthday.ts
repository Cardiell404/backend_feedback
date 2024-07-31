import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeeBirthday extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.invalidBirthday(value);
  }

  private invalidBirthday(value: string): void {
    if (!(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/ .test(value))) {
      throw new InvalidArgumentError(`The Employee birthday <${value}> is invalid, please ingress the next format 'dd/mm/yyyy'`);
    }
  }
}
