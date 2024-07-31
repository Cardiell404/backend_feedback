import { CustomError } from "@__feedback__/shared";

export class GoalNotExist extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not found');

    Object.setPrototypeOf(this, GoalNotExist.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not found' }];
  }
}
