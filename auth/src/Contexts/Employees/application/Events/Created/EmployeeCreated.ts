import { EmployeeId, DomainEventClass, DomainEventSubscriber, EmployeeCreatedDomainEvent } from "@__feedback__/shared";
import { EmployeeNumber } from "../../../domain/value-objects/EmployeeNumber";
import { EmployeeBirthday } from "../../../domain/value-objects/EmployeeBirthday";
import { EmployeeName } from "../../../domain/value-objects/EmployeeName";
import { EmployeeLastName } from "../../../domain/value-objects/EmployeeLastName";
import { EmployeePhoneNumber } from "../../../domain/value-objects/EmployeePhoneNumber";
import { EmployeeCreator } from "./EmployeeCreator";
import { EmployeeEmail } from "../../../domain/value-objects/EmployeeEmail";


export class EmployeeCreated implements DomainEventSubscriber<EmployeeCreatedDomainEvent> {
  constructor(private creator: EmployeeCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [EmployeeCreatedDomainEvent];
  }

  async on(domainEvent: EmployeeCreatedDomainEvent): Promise<void> {
    const { aggregateId, number, birthday, name, lastName, isManager, manager, staff, email, phoneNumber } = domainEvent;

    return this.creator.run({ 
      id: new EmployeeId(aggregateId),
      name: new EmployeeName(name),
      lastName: new EmployeeLastName(lastName),
      number: new EmployeeNumber(number),
      birthday: new EmployeeBirthday(birthday),
      email: new EmployeeEmail(email),
      phoneNumber: new EmployeePhoneNumber(phoneNumber),
      isManager: isManager,
      manager: manager ? new EmployeeId(manager) : undefined,
      staff: staff?.map((staff)=> new EmployeeId(staff))
     });
  }
}
