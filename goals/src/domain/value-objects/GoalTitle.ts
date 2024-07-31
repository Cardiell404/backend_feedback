import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class GoalTitle extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 30) {
      throw new InvalidArgumentError(`The Goal title <${value}> has more than 30 characters`);
    }
  }
}
