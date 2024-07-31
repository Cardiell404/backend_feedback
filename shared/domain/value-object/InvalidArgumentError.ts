import { CustomError } from "../errors";

export class InvalidArgumentError  extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}