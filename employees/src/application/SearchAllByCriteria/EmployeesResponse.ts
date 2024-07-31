import { Employee } from "../../domain/Employee";

export class EmployeesResponse {

  readonly employees: Array<Employee>;

  constructor(employees: Array<Employee>) {
    this.employees = employees;
  }
}
