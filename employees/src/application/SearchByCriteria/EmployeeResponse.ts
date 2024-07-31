import { Nullable } from "@__feedback__/shared";
import { Employee } from "../../domain/Employee";

export class EmployeeResponse {

  readonly employee: Nullable<Employee>;

  constructor(employee: Nullable<Employee>) {
    this.employee = employee;
  }

  public toResponse() {
     return this.employee?.toPrimitives();
  }
}
