"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeCreatedDomainEvent = void 0;
const DomainEvent_1 = require("../DomainEvent");
class EmployeeCreatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, name, lastName, number, birthday, email, phoneNumber, isManager, staff, manager, eventId, occurredOn }) {
        super({ eventName: EmployeeCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
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
    toPrimitives() {
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
    static fromPrimitives(params) {
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
exports.EmployeeCreatedDomainEvent = EmployeeCreatedDomainEvent;
EmployeeCreatedDomainEvent.EVENT_NAME = 'employee.created';
