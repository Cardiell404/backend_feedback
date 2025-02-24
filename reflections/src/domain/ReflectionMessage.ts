import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class ReflectionMessage extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 255) {
      throw new InvalidArgumentError(`The reflection message <${value}> has more than 30 characters`);
    }
  }
}
