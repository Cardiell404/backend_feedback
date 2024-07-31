import { StringValueObject } from "../value-object/StringValueObject";

export class UserAvatar extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
