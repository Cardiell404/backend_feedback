import { Nullable, Filters } from '@__feedback__/shared';
import { Employee } from './Employee';

export interface EmployeeRepository {
  save(employee: Employee): Promise<void>;
  
  search(filters: Filters): Promise<Nullable<Employee>>;

}
