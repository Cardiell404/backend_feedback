import { NumberValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class EmployeeSalary extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureAgeIsLessThan2500pesos(value);
    this.ensureAgeIsGreatherThan160pesos(value);
  }

  private ensureAgeIsLessThan2500pesos(value: number): void {
    if(value < 2500) {
      throw new InvalidArgumentError(`The Employee salary <${value}> is more than 2500 pesos`)
    }
  }

  private ensureAgeIsGreatherThan160pesos(value: number) {
    if(value > 160) {
      throw new InvalidArgumentError(`The Employee salary <${value}> is more than 160 pesos`)
    }
  }
}
