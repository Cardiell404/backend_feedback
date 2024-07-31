"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventDeserializer = void 0;
class DomainEventDeserializer extends Map {
    static configure(subscribers) {
        const mapping = new DomainEventDeserializer();
        subscribers.items.forEach(subscriber => {
            subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping));
        });
        return mapping;
    }
    registerEvent(domainEvent) {
        const eventName = domainEvent.EVENT_NAME;
        this.set(eventName, domainEvent);
    }
    deserialize(event) {
        const eventData = JSON.parse(event).data;
        const { type, aggregateId, attributes, id, occurred_on } = eventData;
        const eventClass = super.get(type);
        if (!eventClass) {
            throw Error(`DomainEvent mapping not found for event ${type}`);
        }
        return eventClass.fromPrimitives({
            aggregateId,
            attributes,
            occurredOn: new Date(occurred_on),
            eventId: id
        });
    }
}
exports.DomainEventDeserializer = DomainEventDeserializer;
