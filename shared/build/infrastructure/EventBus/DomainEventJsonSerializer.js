"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventJsonSerializer = void 0;
class DomainEventJsonSerializer {
    static serialize(event) {
        return JSON.stringify({
            data: {
                id: event.eventId,
                type: event.eventName,
                occurred_on: event.occurredOn.toISOString(),
                aggregateId: event.aggregateId,
                attributes: event.toPrimitives()
            }
        });
    }
}
exports.DomainEventJsonSerializer = DomainEventJsonSerializer;
