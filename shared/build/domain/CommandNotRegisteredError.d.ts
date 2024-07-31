import { Command } from './Command';
export declare class CommandNotRegisteredError extends Error {
    constructor(command: Command);
}
