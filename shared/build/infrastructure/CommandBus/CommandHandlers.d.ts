import { Command } from '../../domain/Command';
import { CommandHandler } from '../../domain/CommandHandler';
export declare class CommandHandlers extends Map<Command, CommandHandler<Command>> {
    constructor(commandHandlers: Array<CommandHandler<Command>>);
    get(command: Command): CommandHandler<Command>;
}
