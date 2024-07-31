import { CustomError } from "@__feedback__/shared";

export class GoalAlreadyExists extends CustomError {
  statusCode = 409;

  constructor(public id: string) {
    super('already exist');

    Object.setPrototypeOf(this, GoalAlreadyExists.prototype);
  }

  serializeErrors() {
    return [{ message: `goal id ${this.id} already exists` }];
  }
}
