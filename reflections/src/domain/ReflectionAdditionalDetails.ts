import { StringValueObject, InvalidArgumentError } from '@__feedback__/shared';

export class ReflectionAdditionalDetails extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 30) {
      throw new InvalidArgumentError(`The Reflection description <${value}> has more than 30 characters`);
    }
  }
}
