import { EmployeeId, AggregateRoot, EmployeeCreatedDomainEvent, UserId } from '@__feedback__/shared';
import { EmployeeNumber } from './value-objects/EmployeeNumber';
import { EmployeeName } from './value-objects/EmployeeName';
import { EmployeeLastName } from './value-objects/EmployeeLastName';
import { EmployeeAge } from './value-objects/EmployeeAge';
import { EmployeeCurp } from './value-objects/EmployeeCurp';
import { EmployeeRfc } from './value-objects/EmployeeRfc';
import { EmployeeBirthday } from './value-objects/EmployeeBirthday';
import { EmployeePhoneNumber } from './value-objects/EmployeePhoneNumber';
import { EmployeeNss } from './value-objects/EmployeeNss';
import { EmployeeEmail } from './value-objects/EmployeeEmail';


export class Employee extends AggregateRoot {
  
  readonly id: EmployeeId;
  readonly name?: EmployeeName;
  readonly lastName?: EmployeeLastName;
  readonly number?: EmployeeNumber;
  readonly email?: EmployeeEmail;
  readonly isManager?: boolean;
  readonly manager?: EmployeeId;
  readonly hidden?: boolean;
  readonly staff?: Array<EmployeeId>;
  readonly age?: EmployeeAge;
  readonly curp?: EmployeeCurp;
  readonly rfc?: EmployeeRfc;
  readonly birthday?: EmployeeBirthday;
  readonly phoneNumber?: EmployeePhoneNumber;
  readonly nss?: EmployeeNss;
  readonly createdBy?: UserId;
  readonly createDate?: Date;


  constructor({id, name, lastName, number, isManager, hidden, staff, manager, age, curp, rfc, birthday,  phoneNumber, nss, email, createdBy, createDate}:
    {id: EmployeeId, name?: EmployeeName, lastName?: EmployeeLastName, number?: EmployeeNumber, isManager?: boolean, 
    hidden?: boolean, staff?: Array<EmployeeId>, manager?: EmployeeId, age?: EmployeeAge, curp?: EmployeeCurp, rfc?: EmployeeRfc, 
    birthday?: EmployeeBirthday, phoneNumber?: EmployeePhoneNumber, nss?: EmployeeNss, email?: EmployeeEmail, createdBy?: UserId, createDate?: Date}) {
    super();
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.number = number;
    this.isManager = isManager;
    this.staff = staff;
    this.manager = manager;
    this.hidden = hidden;
    this.age = age;
    this.curp = curp;
    this.rfc = rfc;
    this.birthday = birthday;
    this.phoneNumber = phoneNumber;
    this.nss = nss;
    this.email = email;
    this.createdBy = createdBy;
    this.createDate = createDate;
  }

  static create(id: EmployeeId, name: EmployeeName, lastName: EmployeeLastName, number: EmployeeNumber, age: EmployeeAge, curp: EmployeeCurp, rfc: EmployeeRfc, birthday: EmployeeBirthday, email: EmployeeEmail, phoneNumber: EmployeePhoneNumber, nss: EmployeeNss, isManager: boolean, hidden: boolean, createdBy: UserId, createDate: Date, manager?: EmployeeId, staff?: Array<EmployeeId>): Employee {
    const employee = new Employee({id, name, lastName, number, isManager, staff, manager, hidden, age, curp, rfc, birthday, email, phoneNumber, nss, createDate, createdBy});

    employee.record(
      new EmployeeCreatedDomainEvent({
        aggregateId: employee.id.value,
        name: employee.name!.value,
        lastName: employee.lastName!.value,
        number: employee.number!.value,
        isManager: isManager,
        birthday:  employee.birthday!.value,
        email: employee.email!.value,
        phoneNumber:  employee.phoneNumber!.value,
        staff: employee.staff?.map(staff => staff.value),
        manager: employee.manager?.value,
      })
    );

    return employee;
  }

  static update(id: EmployeeId, name?: EmployeeName, lastName?: EmployeeLastName, number?: EmployeeNumber, age?: EmployeeAge, curp?: EmployeeCurp, rfc?: EmployeeRfc, birthday?: EmployeeBirthday, email?: EmployeeEmail, phoneNumber?: EmployeePhoneNumber, nss?: EmployeeNss, isManager?: boolean, hidden?: boolean, manager?: EmployeeId, staff?: Array<EmployeeId>): Employee {
    return new Employee({id, name, lastName, number, isManager, staff, manager, hidden, age, curp, rfc, birthday, phoneNumber, nss, email});
  }

  static fromPrimitives(plainData: { id: string; name: string; lastName: string, number: string, age: number, curp: string, rfc: string, birthday: string, email: string, phoneNumber: string, nss: string, isManager: boolean, hidden: boolean, createdBy: string, createDate: Date, staff?: Array<string>, manager?: string }): Employee {
    return new Employee({
      id: new EmployeeId(plainData.id),
      name: new EmployeeName(plainData.name),
      lastName: new EmployeeLastName(plainData.lastName),
      number: new EmployeeNumber(plainData.number),
      age: new EmployeeAge(plainData.age),
      curp: new EmployeeCurp(plainData.curp),
      rfc: new EmployeeRfc(plainData.rfc),
      birthday: new EmployeeBirthday(plainData.birthday),
      email: new EmployeeEmail(plainData.email),
      phoneNumber: new EmployeePhoneNumber(plainData.phoneNumber),
      nss: new EmployeeNss(plainData.nss),
      createdBy: new UserId(plainData.createdBy),
      createDate: plainData.createDate,
      isManager: plainData.isManager,
      hidden: plainData.hidden,
      manager: plainData.manager ? new EmployeeId(plainData.manager): undefined,
      staff: plainData.staff?.map(staff => new EmployeeId(staff))},
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name?.value,
      lastName: this.lastName?.value,
      number: this.number?.value,
      age: this.age?.value,
      nss: this.nss?.value,
      curp: this.curp?.value,
      rfc: this.rfc?.value,
      birthday: this.birthday?.value,
      email: this.email?.value,
      phoneNumber: this.phoneNumber?.value,
      isManager: this.isManager,
      staff: this.staff?.map(staff => staff.value),
      manager: this.manager?.value,
      hidden: this.hidden,
      createDate: this.createDate,
      createdBy: this.createdBy?.value
    };
  }
}
