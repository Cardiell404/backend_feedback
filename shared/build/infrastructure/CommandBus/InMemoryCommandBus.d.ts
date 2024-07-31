import { Command } from '../../domain/Command';
import { CommandBus } from './../../domain/CommandBus';
import { CommandHandlers } from './CommandHandlers';
export declare class InMemoryCommandBus implements CommandBus {
    private commandHandlers;
    constructor(commandHandlers: CommandHandlers);
    dispatch(command: Command): Promise<void>;
}
