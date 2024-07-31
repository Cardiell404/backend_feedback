"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const CommandNotRegisteredError_1 = require("../../domain/CommandNotRegisteredError");
class CommandHandlers extends Map {
    constructor(commandHandlers) {
        super();
        commandHandlers.forEach(commandHandler => {
            this.set(commandHandler.subscribedTo(), commandHandler);
        });
    }
    get(command) {
        const commandHandler = super.get(command.constructor);
        if (!commandHandler) {
            throw new CommandNotRegisteredError_1.CommandNotRegisteredError(command);
        }
        return commandHandler;
    }
}
exports.CommandHandlers = CommandHandlers;
