"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const Uuid_1 = require("./value-object/Uuid");
class DomainEvent {
    constructor(params) {
        const { aggregateId, eventName, eventId, occurredOn } = params;
        this.aggregateId = aggregateId;
        this.eventId = eventId || Uuid_1.Uuid.random().value;
        this.occurredOn = occurredOn || new Date();
        this.eventName = eventName;
    }
}
exports.DomainEvent = DomainEvent;
