import { Command, CommandHandler, EmployeeId } from "@__feedback__/shared";
import { EmployeeLastName } from "../../domain/value-objects/EmployeeLastName";
import { EmployeeName } from "../../domain/value-objects/EmployeeName";
import { EmployeeNumber } from "../../domain/value-objects/EmployeeNumber";
import { EmployeeUpdater } from "./EmployeeUpdater";
import { UpdateEmployeeCommand } from "./UpdateEmployeeCommand";
import { EmployeeAge } from "../../domain/value-objects/EmployeeAge";
import { EmployeeRfc } from "../../domain/value-objects/EmployeeRfc";
import { EmployeeCurp } from "../../domain/value-objects/EmployeeCurp";
import { EmployeeBirthday } from "../../domain/value-objects/EmployeeBirthday";
import { EmployeePhoneNumber } from "../../domain/value-objects/EmployeePhoneNumber";
import { EmployeeNss } from "../../domain/value-objects/EmployeeNss";
import { EmployeeEmail } from "../../domain/value-objects/EmployeeEmail";

export class UpdateEmployeeCommandHandler implements CommandHandler<UpdateEmployeeCommand> {
    constructor(private employeeUpdater: EmployeeUpdater) {}

    subscribedTo(): Command {
        return UpdateEmployeeCommand;
    }

    async handle(command: UpdateEmployeeCommand): Promise<void> {
        const employeeId = new EmployeeId(command.id);
        const employeeName = command.name ? new EmployeeName(command.name): undefined;
        const employeeLastName = command.lastName ? new EmployeeLastName(command.lastName) : undefined;
        const employeeNumber = command.number ? new EmployeeNumber(command.number) : undefined;
        const employeeAge = command.age ? new EmployeeAge(command.age) : undefined;
        const employeeCurp = command.curp ? new EmployeeCurp(command.curp) : undefined;
        const employeeRfc = command.rfc ? new EmployeeRfc(command.rfc) : undefined;
        const employeeBirthday = command.birthday ? new EmployeeBirthday(command.birthday) : undefined;
        const employeeEmail = command.email ? new EmployeeEmail(command.email) : undefined;
        const employeePhoneNumber = command.phoneNumber ? new EmployeePhoneNumber(command.phoneNumber) : undefined;
        const employeeNss = command.nss ? new EmployeeNss(command.nss) : undefined;
        const employeeIsManager = command.isManager;
        const employeeStaff = command.staff?.map(staff => new EmployeeId(staff)) ;
        const employeeManager = command.manager ? new EmployeeId(command.manager) : undefined;
        const employeeHidden = command.hidden;
        await this.employeeUpdater.run({ employeeId, employeeName, employeeLastName, employeeNumber, employeeAge, employeeCurp, employeeRfc, employeeBirthday, employeePhoneNumber, employeeNss, employeeIsManager, employeeStaff, employeeManager, employeeHidden, employeeEmail });
    }
}
