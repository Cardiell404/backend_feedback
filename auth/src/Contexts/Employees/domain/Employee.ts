import { EmployeeId, AggregateRoot } from '@__feedback__/shared';
import { EmployeeNumber } from './value-objects/EmployeeNumber';
import { EmployeeName } from './value-objects/EmployeeName';
import { EmployeeLastName } from './value-objects/EmployeeLastName';
import { EmployeeBirthday } from './value-objects/EmployeeBirthday';
import { EmployeePhoneNumber } from './value-objects/EmployeePhoneNumber';
import { EmployeeEmail } from './value-objects/EmployeeEmail';


export class Employee extends AggregateRoot {
  
  readonly id: EmployeeId;
  readonly name: EmployeeName;
  readonly lastName: EmployeeLastName;
  readonly number: EmployeeNumber;
  readonly isManager: boolean;
  readonly birthday: EmployeeBirthday;
  readonly email: EmployeeEmail;
  readonly phoneNumber: EmployeePhoneNumber;
  readonly manager?: EmployeeId;
  readonly staff?: Array<EmployeeId>;


  constructor({id, name, lastName, number, isManager, staff, manager, birthday,  email, phoneNumber }:
    {id: EmployeeId, name: EmployeeName, lastName: EmployeeLastName, number: EmployeeNumber, isManager: boolean, staff?: Array<EmployeeId>, manager?: EmployeeId, birthday: EmployeeBirthday, email: EmployeeEmail, phoneNumber: EmployeePhoneNumber}) {
    super();
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.number = number;
    this.isManager = isManager;
    this.staff = staff;
    this.manager = manager;
    this.birthday = birthday;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  static create(id: EmployeeId, name: EmployeeName, lastName: EmployeeLastName, number: EmployeeNumber, birthday: EmployeeBirthday, email: EmployeeEmail, phoneNumber: EmployeePhoneNumber, isManager: boolean,  manager?: EmployeeId, staff?: Array<EmployeeId>): Employee {
    return new Employee({id, name, lastName, number, isManager, staff, manager, birthday, email, phoneNumber});
  }

  static fromPrimitives(plainData: { id: string; name: string; lastName: string, number: string, birthday: string, email: string, phoneNumber: string, isManager: boolean, staff?: Array<string>, manager?: string }): Employee {
    return new Employee({
      id: new EmployeeId(plainData.id),
      name: new EmployeeName(plainData.name),
      lastName: new EmployeeLastName(plainData.lastName),
      number: new EmployeeNumber(plainData.number),
      birthday: new EmployeeBirthday(plainData.birthday),
      email: new EmployeeEmail(plainData.email),
      phoneNumber: new EmployeePhoneNumber(plainData.phoneNumber),
      isManager: plainData.isManager,
      manager: plainData.manager ? new EmployeeId(plainData.manager): undefined,
      staff: plainData.staff?.map(staff => new EmployeeId(staff))},
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      lastName: this.lastName.value,
      number: this.number.value,
      birthday: this.birthday.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      isManager: this.isManager,
      manager: this.manager?.value,
      staff: this.staff?.map(staff => staff.value),
    };
  }

}
