import { Nullable, Criteria, Filters } from '@__feedback__/shared';
import { Employee } from './Employee';

export interface EmployeeRepository {
  save(employee: Employee): Promise<void>;
  
  searchAll(criteria: Criteria): Promise<Array<Employee>>;

  search(filters: Filters): Promise<Nullable<Employee>>;

}
