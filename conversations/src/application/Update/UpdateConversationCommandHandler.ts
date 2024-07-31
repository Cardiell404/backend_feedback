
import { Command, CommandHandler } from "@__feedback__/shared";
import { ConversationAdditionalDetails } from "../../domain/ConversationAdditionalDetails";
import { ConversationDescription } from "../../domain/ConversationDescription";
import { ConversationId } from "../../domain/ConversationId";
import { ConversationTitle } from "../../domain/ConversationTitle";
import { ConversationUpdater } from "./ConversationUpdater";
import { UpdateConversationCommand } from "./UpdateConversationCommand";


export class UpdateConversationCommandHandler implements CommandHandler<UpdateConversationCommand> {
    constructor(private conversationUpdater: ConversationUpdater) {}

    subscribedTo(): Command {
        return UpdateConversationCommand;
    }

    async handle(command: UpdateConversationCommand): Promise<void> {
        const conversationId = new ConversationId(command.id);
        const conversationTitle = command.title ? new ConversationTitle(command.title) : undefined;
        const conversationDescription = command.description ? new ConversationDescription(command.description) : undefined;
        const conversationAdditionalDetails = command.additionalDetails ? new ConversationAdditionalDetails(command.additionalDetails) : undefined;
        const conversationHidden = command.hidden;
        await this.conversationUpdater.run({ conversationId, conversationTitle, conversationDescription, conversationAdditionalDetails, conversationHidden });
    }
}
