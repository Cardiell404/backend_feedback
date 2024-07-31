"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventFailoverPublisher = void 0;
const DomainEventJsonSerializer_1 = require("../DomainEventJsonSerializer");
class DomainEventFailoverPublisher {
    constructor(client, deserializer) {
        this.client = client;
        this.deserializer = deserializer;
    }
    collection() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.client).db().collection(DomainEventFailoverPublisher.collectionName);
        });
    }
    setDeserializer(deserializer) {
        this.deserializer = deserializer;
    }
    publish(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.collection();
            const eventSerialized = DomainEventJsonSerializer_1.DomainEventJsonSerializer.serialize(event);
            const options = { upsert: true };
            const update = { $set: { eventId: event.eventId, event: eventSerialized } };
            yield collection.updateOne({ eventId: event.eventId }, update, options);
        });
    }
    consume() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.collection();
            const documents = yield collection.find().limit(200).toArray();
            if (!this.deserializer) {
                throw new Error('Deserializer has not been set yet');
            }
            const events = documents.map(document => this.deserializer.deserialize(document.event));
            return events.filter(Boolean);
        });
    }
}
exports.DomainEventFailoverPublisher = DomainEventFailoverPublisher;
DomainEventFailoverPublisher.collectionName = 'DomainEvents';
