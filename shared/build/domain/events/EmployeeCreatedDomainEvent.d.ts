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
export declare class EmployeeCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "employee.created";
    readonly name: string;
    readonly lastName: string;
    readonly number: string;
    readonly birthday: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly isManager: boolean;
    readonly manager?: string;
    readonly staff?: Array<string>;
    constructor({ aggregateId, name, lastName, number, birthday, email, phoneNumber, isManager, staff, manager, eventId, occurredOn }: {
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
    });
    toPrimitives(): CreateEmployeeDomainEventBody;
    static fromPrimitives(params: {
        aggregateId: string;
        attributes: CreateEmployeeDomainEventBody;
        eventId: string;
        occurredOn: Date;
    }): DomainEvent;
}
export {};
