import { NumberValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeeAge extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureAgeIsLessThan100years(value);
    this.ensureAgeIsGreatherThan16years(value);
  }

  private ensureAgeIsLessThan100years(value: number): void {
    if(value > 80) {
      throw new InvalidArgumentError(`The Employee age <${value}> has more than 80 years`)
    }
  }

  private ensureAgeIsGreatherThan16years(value: number) {
    if(value < 16) {
      throw new InvalidArgumentError(`The Employee age <${value}> has more than 16 years`)
    }
  }
}
