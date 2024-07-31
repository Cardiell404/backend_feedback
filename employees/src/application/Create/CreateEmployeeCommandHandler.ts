import { CreateEmployeeCommand } from './CreateEmployeeCommand';
import { EmployeeCreator } from './EmployeeCreator';
import { EmployeeName } from '../../domain/value-objects/EmployeeName';
import { EmployeeLastName } from '../../domain/value-objects/EmployeeLastName';
import { EmployeeNumber } from '../../domain/value-objects/EmployeeNumber';
import { EmployeeId, Command, CommandHandler, UserId } from '@__feedback__/shared';
import { EmployeeAge } from '../../domain/value-objects/EmployeeAge';
import { EmployeeCurp } from '../../domain/value-objects/EmployeeCurp';
import { EmployeeRfc } from '../../domain/value-objects/EmployeeRfc';
import { EmployeeBirthday } from '../../domain/value-objects/EmployeeBirthday';
import { EmployeePhoneNumber } from '../../domain/value-objects/EmployeePhoneNumber';
import { EmployeeNss } from '../../domain/value-objects/EmployeeNss';
import { EmployeeEmail } from '../../domain/value-objects/EmployeeEmail';

export class CreateEmployeeCommandHandler implements CommandHandler<CreateEmployeeCommand> {
    constructor(private employeeCreator: EmployeeCreator) {}

    subscribedTo(): Command {
        return CreateEmployeeCommand;
    }

    async handle(command: CreateEmployeeCommand): Promise<void> {

        const employeeId = new EmployeeId(command.id);
        const employeeName = new EmployeeName(command.name);
        const employeeLastName =  new EmployeeLastName(command.lastName);
        const employeeNumber = new EmployeeNumber(command.number);
        const employeeAge = new EmployeeAge(command.age);
        const employeeCurp = new EmployeeCurp(command.curp);
        const employeeRfc = new EmployeeRfc(command.rfc);
        const employeeBirthday =  new EmployeeBirthday(command.birthday);
        const employeeEmail = new EmployeeEmail(command.email);
        const employeePhoneNumber = new EmployeePhoneNumber(command.phoneNumber);
        const employeeNss = new EmployeeNss(command.nss);
        const employeeIsManager = command.isManager;
        const employeeStaff = command.staff?.map(staff => new EmployeeId(staff));
        const employeeCreateDate = command.createDate;
        const employeeCreatedBy = new UserId(command.createdBy);
        const employeeManager = command.manager ? new EmployeeId(command.manager) : undefined;
        const employeeHidden = command.hidden;
        await this.employeeCreator.run({ employeeId, employeeName, employeeLastName, employeeNumber,employeeAge, employeeCurp,employeeRfc,employeeBirthday, employeePhoneNumber, employeeNss, employeeIsManager, employeeStaff, employeeManager, employeeHidden, employeeEmail, employeeCreateDate, employeeCreatedBy });
    }
}
