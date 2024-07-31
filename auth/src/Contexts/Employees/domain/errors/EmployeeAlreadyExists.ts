import { CustomError } from "@__feedback__/shared";

export class EmployeeAlreadyExists extends CustomError {
  statusCode = 409;

  constructor(public employeeId: string) {
    super('already exist');

    Object.setPrototypeOf(this, EmployeeAlreadyExists.prototype);
  }

  serializeErrors() {
    return [{ message: `Employee number ${this.employeeId} already exists` }];
  }
}
