import { EmployeeId } from '@__feedback__/shared';
import { Employee } from '../../../domain/Employee';
import { EmployeeName } from '../../../domain/value-objects/EmployeeName';
import { EmployeeLastName } from '../../../domain/value-objects/EmployeeLastName';
import { EmployeeBirthday } from '../../../domain/value-objects/EmployeeBirthday';
import { EmployeePhoneNumber } from '../../../domain/value-objects/EmployeePhoneNumber';
import { EmployeeNumber } from '../../../domain/value-objects/EmployeeNumber';
import { EmployeeRepository } from '../../../domain/EmployeeRepository';
import { EmployeeEmail } from '../../../domain/value-objects/EmployeeEmail';

type Params = {
  id: EmployeeId,
  name: EmployeeName,
  lastName: EmployeeLastName,
  number: EmployeeNumber,
  birthday: EmployeeBirthday,
  email: EmployeeEmail,
  phoneNumber: EmployeePhoneNumber,
  isManager: boolean,
  manager?: EmployeeId,
  staff?: EmployeeId[]
};

export class EmployeeCreator {
  private repository: EmployeeRepository;

  constructor(repository: EmployeeRepository) {
    this.repository = repository;
  }

  async run({ id, name, lastName, number, birthday, email, phoneNumber, isManager, manager, staff }: Params): Promise<void> {
    const user = Employee.create(id, name, lastName, number, birthday, email, phoneNumber, isManager, manager, staff);
    await this.repository.save(user);
  }
}
