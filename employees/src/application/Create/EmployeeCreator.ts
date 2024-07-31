import { EmployeeId, EventBus, UserId } from "@__feedback__/shared";
import { EmployeeName } from "../../domain/value-objects/EmployeeName";
import { EmployeeLastName } from "../../domain/value-objects/EmployeeLastName";
import { EmployeeNumber } from "../../domain/value-objects/EmployeeNumber";
import { EmployeeAge } from "../../domain/value-objects/EmployeeAge";
import { EmployeeCurp } from "../../domain/value-objects/EmployeeCurp";
import { EmployeeRfc } from "../../domain/value-objects/EmployeeRfc";
import { EmployeeBirthday } from "../../domain/value-objects/EmployeeBirthday";
import { EmployeePhoneNumber } from "../../domain/value-objects/EmployeePhoneNumber";
import { EmployeeNss } from "../../domain/value-objects/EmployeeNss";
import { EmployeeRepository } from "../../domain/EmployeeRepository";
import { Employee } from "../../domain/Employee";
import { EmployeeAlreadyExists } from "../../domain/errors/EmployeeAlreadyExists";
import { FiltersMapping } from "../../utils/FiltersMapping";
import { EmployeeEmail } from "../../domain/value-objects/EmployeeEmail";


type Params = {
  readonly employeeId: EmployeeId;
  readonly employeeName: EmployeeName;
  readonly employeeLastName: EmployeeLastName;
  readonly employeeNumber: EmployeeNumber;
  readonly employeeAge: EmployeeAge;
  readonly employeeCurp: EmployeeCurp;
  readonly employeeRfc: EmployeeRfc;
  readonly employeeBirthday: EmployeeBirthday;
  readonly employeeEmail: EmployeeEmail;
  readonly employeePhoneNumber: EmployeePhoneNumber;
  readonly employeeNss: EmployeeNss;
  readonly employeeIsManager: boolean;
  readonly employeeHidden: boolean;
  readonly employeeCreatedBy: UserId,
  readonly employeeCreateDate: Date;
  readonly employeeManager?: EmployeeId;
  readonly employeeStaff?: Array<EmployeeId>;
};


export class EmployeeCreator{
  private repository: EmployeeRepository;

  constructor(repository: EmployeeRepository, private bus: EventBus) {
    this.repository = repository;
  }

  async run({  employeeId, employeeName, employeeLastName, employeeNumber, employeeAge, employeeCurp, employeeRfc, employeeBirthday, employeeEmail, employeePhoneNumber, employeeNss, employeeIsManager, employeeHidden, employeeStaff, employeeManager, employeeCreatedBy, employeeCreateDate }: Params): Promise<void> {
    const existEmployee = await this.repository.search(FiltersMapping.employeeNumber(employeeNumber.value));

    if(existEmployee) {
      throw new EmployeeAlreadyExists(employeeNumber.value);
    }
    const employee = Employee.create(employeeId, employeeName, employeeLastName, employeeNumber, employeeAge, employeeCurp, employeeRfc, employeeBirthday, employeeEmail, employeePhoneNumber, employeeNss, employeeIsManager, employeeHidden, employeeCreatedBy, employeeCreateDate, employeeManager,  employeeStaff );
    await this.repository.save(employee);
    await this.bus.publish(employee.pullDomainEvents());
  }
}
