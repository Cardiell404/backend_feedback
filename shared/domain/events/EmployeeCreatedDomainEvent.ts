import { DomainEvent } from "../DomainEvent";

type CreateEmployeeDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly name: string;
  readonly lastName: string;
  readonly number: string;
  readonly birthday: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly isManager: boolean;
  readonly manager?: string;
  readonly staff?: Array<string>;
};

export class EmployeeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'employee.created';

  readonly name: string;
  readonly lastName: string;
  readonly number: string;
  readonly birthday: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly isManager: boolean;
  readonly manager?: string;
  readonly staff?: Array<string>;

  constructor({
    aggregateId,
    name,
    lastName,
    number,
    birthday,
    email,
    phoneNumber,
    isManager,
    staff,
    manager,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    name: string;
    lastName: string;
    number: string;
    birthday: string;
    email: string;
    phoneNumber: string;
    isManager: boolean;
    manager?: string;
    staff?: Array<string>;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({eventName: EmployeeCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.name = name;
    this.lastName = lastName;
    this.number = number;
    this.birthday = birthday;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.isManager = isManager;
    this.staff = staff;
    this.manager = manager;
  }

  toPrimitives(): CreateEmployeeDomainEventBody {
    const { name, lastName, aggregateId, number, birthday, email, phoneNumber, isManager, staff, manager } = this;
    return {
      name,
      lastName,
      number,
      birthday,
      email,
      phoneNumber,
      isManager,
      staff,
      manager,
      eventName: EmployeeCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(params: {
    aggregateId: string,
    attributes: CreateEmployeeDomainEventBody,
    eventId: string,
    occurredOn: Date
 } ): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new EmployeeCreatedDomainEvent({
      aggregateId,
      name: attributes.name,
      lastName: attributes.lastName,
      number: attributes.number,
      birthday: attributes.birthday,
      email: attributes.email,
      phoneNumber: attributes.phoneNumber,
      isManager: attributes.isManager,
      staff: attributes.staff,
      manager: attributes.manager,
      eventId,
      occurredOn
    });
  }
}
