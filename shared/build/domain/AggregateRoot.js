"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
class AggregateRoot {
    constructor() {
        this.domainEvents = [];
    }
    pullDomainEvents() {
        const domainEvents = this.domainEvents.slice();
        this.domainEvents = [];
        return domainEvents;
    }
    record(event) {
        this.domainEvents.push(event);
    }
}
exports.AggregateRoot = AggregateRoot;
