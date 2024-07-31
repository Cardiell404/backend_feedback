import { UserId, Command, CommandHandler } from '@__feedback__/shared';
import { ReflectionId } from "../../domain/ReflectionId";
import { ReflectionMessage } from "../../domain/ReflectionMessage";
import { SendReflectionCreator } from "./SendReflectionCreator";
import { SendReflectionCommand } from "./SendReflectionCommand";

export class SendReflectionCommandHandler implements CommandHandler<SendReflectionCommand> {
    constructor(private reflectionCreator: SendReflectionCreator) {}

    subscribedTo(): Command {
        return SendReflectionCommand;
    }

    async handle(command: SendReflectionCommand): Promise<void> {
        const reflectionId = new ReflectionId(command.id);
        const reflectionCreateDate = command.createDate;
        const reflectionMessage = new ReflectionMessage(command.message);
        const reflectionUserId = new UserId(command.userId);
        await this.reflectionCreator.run({ reflectionId, reflectionCreateDate, reflectionMessage, reflectionUserId });
    }
}
