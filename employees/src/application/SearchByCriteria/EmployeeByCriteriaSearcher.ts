import { Filters } from "@__feedback__/shared";
import { EmployeeRepository } from "../../domain/EmployeeRepository";
import { EmployeeResponse } from "./EmployeeResponse";
import { EmployeeNotExist } from "../../domain/errors/EmployeeNotExist";

export class EmployeeByCriteriaSearcher {
  constructor(private repository: EmployeeRepository) {}

  async run(filters: Filters) {
    const result = await this.repository.search(filters);

    if(!result) {
      throw new EmployeeNotExist();
    }

    return new EmployeeResponse(result);
  }
}
