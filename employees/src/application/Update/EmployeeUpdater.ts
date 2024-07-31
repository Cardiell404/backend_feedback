import { EmployeeLastName } from '../../domain/value-objects/EmployeeLastName';
import { Employee } from "../../domain/Employee";
import { EmployeeId } from "@__feedback__/shared";
import { EmployeeName } from "../../domain/value-objects/EmployeeName";
import { EmployeeNumber } from "../../domain/value-objects/EmployeeNumber";
import { EmployeeRepository } from "../../domain/EmployeeRepository";
import { EmployeeAge } from "../../domain/value-objects/EmployeeAge";
import { EmployeeCurp } from "../../domain/value-objects/EmployeeCurp";
import { EmployeeRfc } from "../../domain/value-objects/EmployeeRfc";
import { EmployeeBirthday } from "../../domain/value-objects/EmployeeBirthday";
import { EmployeeNss } from "../../domain/value-objects/EmployeeNss";
import { EmployeePhoneNumber } from "../../domain/value-objects/EmployeePhoneNumber";
import { EmployeeNotExist } from "../../domain/errors/EmployeeNotExist";
import { FiltersMapping } from '../../utils/FiltersMapping';
import { EmployeeEmail } from '../../domain/value-objects/EmployeeEmail';

type Params = {
  readonly employeeId: EmployeeId;
  readonly employeeName?: EmployeeName;
  readonly employeeLastName?: EmployeeLastName;
  readonly employeeNumber?: EmployeeNumber;
  readonly employeeAge?: EmployeeAge;
  readonly employeeCurp?: EmployeeCurp;
  readonly employeeRfc?: EmployeeRfc;
  readonly employeeBirthday?: EmployeeBirthday;
  readonly employeeEmail?: EmployeeEmail;
  readonly employeePhoneNumber?: EmployeePhoneNumber;
  readonly employeeNss?: EmployeeNss;
  readonly employeeIsManager?: boolean;
  readonly employeeHidden?: boolean;
  readonly employeeManager?: EmployeeId;
  readonly employeeStaff?: Array<EmployeeId>;
};


export class EmployeeUpdater {
  private repository: EmployeeRepository;

  constructor(repository: EmployeeRepository) {
    this.repository = repository;
  }

  async run({  employeeId, employeeName, employeeLastName, employeeNumber, employeeAge, employeeCurp, employeeRfc, employeeBirthday, employeeEmail, employeePhoneNumber, employeeNss, employeeIsManager, employeeHidden, employeeStaff, employeeManager }: Params): Promise<void> {
    const employee = await this.repository.search(FiltersMapping.id(employeeId.value));

    if(!employee) {
      throw new EmployeeNotExist();
    }

    //TODO: Validar que si se actualiza el employeeNumber y ya lo tiene asignado alguien, mande mensaje de error.
    const updateEmployee = Employee.update(
      employeeId, 
      employeeName        || employee.name, 
      employeeLastName    || employee.lastName, 
      employeeNumber      || employee.number, 
      employeeAge         || employee.age, 
      employeeCurp        || employee.curp, 
      employeeRfc         || employee.rfc, 
      employeeBirthday    || employee.birthday, 
      employeeEmail       || employee.email,
      employeePhoneNumber || employee.phoneNumber, 
      employeeNss         || employee.nss, 
      employeeIsManager   || employee.isManager,
      (employeeHidden != undefined) ? employeeHidden : employee.hidden, 
      employeeManager     || employee.manager, 
      employeeStaff       || employee.staff );

      await this.repository.save(updateEmployee);
  }
}
