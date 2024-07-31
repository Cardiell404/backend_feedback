import { CreateConversationCommand } from './CreateConversationCommand';
import { ConversationCreator } from './ConversationCreator';
import { ConversationId } from '../domain/ConversationId';
import { ConversationTitle } from '../domain/ConversationTitle';
import { ConversationDescription } from '../domain/ConversationDescription';
import { ConversationAdditionalDetails } from '../domain/ConversationAdditionalDetails';
import { ConversationWhoCanSee } from '../domain/ConversationWhoCanSee';
import { UserId, Command, CommandHandler } from '@__feedback__/shared';
export class CreateConversationCommandHandler implements CommandHandler<CreateConversationCommand> {
    constructor(private conversationCreator: ConversationCreator) {}

    subscribedTo(): Command {
        return CreateConversationCommand;
    }

    async handle(command: CreateConversationCommand): Promise<void> {
        const conversationId = new ConversationId(command.id);
        const conversationTitle = new ConversationTitle(command.title);
        const conversationCreateDate = command.createDate;
        const conversationDescription = new ConversationDescription(command.description);
        const conversationWhoCanSee = new ConversationWhoCanSee(command.whoCanSee.map((id)=>new UserId(id)));
        const conversationCreatedBy = new UserId(command.createdBy);
        const conversationAdditionalDetails = new ConversationAdditionalDetails(command.additionalDetails);
        const conversationHidden = command.hidden;
        await this.conversationCreator.run({ conversationId, conversationTitle, conversationDescription, conversationCreatedBy, conversationWhoCanSee, conversationCreateDate, conversationAdditionalDetails, conversationHidden });
    }
}
