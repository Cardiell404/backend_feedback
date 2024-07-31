import { Nullable, Criteria, MongoRepository, Filters } from '@__feedback__/shared';
import { Employee } from '../../../domain/Employee';
import { EmployeeRepository } from '../../../domain/EmployeeRepository';
import { IEmployee } from '../../../domain/IEmployee';

export class MongoEmployeeRepository extends MongoRepository<Employee> implements EmployeeRepository {

  public save(employee: Employee): Promise<void> {
    return this.persist(employee.id.value, employee);
  }

  public async search(filters: Filters): Promise<Nullable<Employee>> {
    const document = await this.searchByCriteria<IEmployee>(filters);

    return document ? Employee.fromPrimitives({ 
      id: document._id,
      name: document.name,
      lastName: document.lastName,
      number: document.number,
      age: document.age,
      curp: document.curp,
      rfc: document.rfc,
      email: document.email,
      birthday: document.birthday,
      phoneNumber: document.phoneNumber,
      nss: document.nss,
      isManager: document.isManager,
      staff: document.staff,
      hidden: document.hidden,
      manager: document.manager,
      createDate: document.createDate,
      createdBy: document.createdBy
     }) : null;
  }


  public async searchAll(criteria: Criteria): Promise<Array<Employee>> {
    const documents = await this.searchAllByCriteria<IEmployee>(criteria);
    console.log(documents);
    return documents.map((employee) => Employee.fromPrimitives({
      id: employee._id,
      name: employee.name,
      lastName: employee.lastName,
      number: employee.number,
      age: employee.age,
      curp: employee.curp,
      rfc: employee.rfc,
      email: employee.email,
      birthday: employee.birthday,
      phoneNumber: employee.phoneNumber,
      nss: employee.nss,
      isManager: employee.isManager,
      staff: employee.staff,
      hidden: employee.hidden,
      manager: employee.manager,
      createDate: employee.createDate,
      createdBy: employee.createdBy
    }))
  }

  protected moduleName(): string {
    return 'employees';
  }
}
