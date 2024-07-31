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
exports.InMemoryAsyncEventBus = void 0;
const events_1 = require("events");
class InMemoryAsyncEventBus extends events_1.EventEmitter {
    publish(events) {
        return __awaiter(this, void 0, void 0, function* () {
            events.map(event => this.emit(event.eventName, event));
        });
    }
    addSubscribers(subscribers) {
        subscribers.items.forEach(subscriber => {
            subscriber.subscribedTo().forEach(event => {
                this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
            });
        });
    }
}
exports.InMemoryAsyncEventBus = InMemoryAsyncEventBus;
