import { Nullable, Filters, MongoRepository } from '@__feedback__/shared';
import { Employee } from '../../../domain/Employee';
import { IEmployee } from '../../../domain/IEmployee';
import { EmployeeRepository } from '../../../domain/EmployeeRepository';

export class MongoEmployeeRepository extends MongoRepository<Employee> implements EmployeeRepository {

  public save(employee: Employee): Promise<void> {
    return this.persist(employee.id.value, employee);
  }

  public async search(filters: Filters): Promise<Nullable<Employee>> {
    console.log('Search Employee');
    const document = await this.searchByCriteria<IEmployee>(filters);
    console.log(document);
    return document ? Employee.fromPrimitives({ 
      id: document._id,
      name: document.name,
      lastName: document.lastName,
      number: document.number,
      birthday: document.birthday,
      email: document.email,
      phoneNumber: document.phoneNumber,
      isManager: document.isManager,
      manager: document.manager,
      staff: document.staff
     }) : null;
  }


  protected moduleName(): string {
    return 'employees';
  }
}
