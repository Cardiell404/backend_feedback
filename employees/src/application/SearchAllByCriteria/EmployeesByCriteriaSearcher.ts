import { Criteria, Filters, Order } from '@__feedback__/shared';
import { EmployeeRepository } from '../../domain/EmployeeRepository';
import { EmployeesResponse } from './EmployeesResponse';

export class EmployeesByCriteriaSearcher {
  constructor(private repository: EmployeeRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<EmployeesResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const employees = await this.repository.searchAll(criteria);
    return new EmployeesResponse(employees);
  }
}
