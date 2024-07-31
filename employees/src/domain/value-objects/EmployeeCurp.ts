import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeeCurp extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.invalidCurp(value);
  }

  private invalidCurp(value: string) {
    if(value.length > 18) {
      throw new InvalidArgumentError(`The Employee curp <${value}> has more than 18 characters`);
    }

    if(value.length < 18) {
      throw new InvalidArgumentError(`The Employee curp <${value}> has less than 18 characters`);
    }
  }
}
