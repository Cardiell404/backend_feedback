import { CustomError } from "@__feedback__/shared";

export class EmployeeNotExist extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not found');

    Object.setPrototypeOf(this, EmployeeNotExist.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not found' }];
  }
}
