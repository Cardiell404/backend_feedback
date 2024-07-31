import { CustomError } from "@__feedback__/shared";

export class UserNotExist extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not found');

    Object.setPrototypeOf(this, UserNotExist.prototype);
  }

  serializeErrors() {
    return [{ message: 'User not found' }];
  }
}
