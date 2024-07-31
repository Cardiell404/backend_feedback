import { Command, CommandHandler, UserId } from "@__feedback__/shared";
import { ConversationId } from "../../domain/ConversationId";
import { SendConversationCreator } from "./SendConversationCreator";
import { SendConversationCommand } from "./SendConversationCommand";
import { CommentId } from '../../domain/CommentId';
import { CommentText } from '../../domain/CommentText';

export class SendConversationCommandHandler implements CommandHandler<SendConversationCommand> {
    constructor(private conversationCreator: SendConversationCreator) {}

    subscribedTo(): Command {
        return SendConversationCommand;
    }

    async handle(command: SendConversationCommand): Promise<void> {
        const conversationId = new ConversationId(command.conversationId);
        const commentId = new CommentId(command.id)
        const commentDatePublished = command.datePublished;
        const commentText = new CommentText(command.text);
        const commentBy = new UserId(command.commentBy);
        await this.conversationCreator.run({ conversationId, commentId, commentDatePublished, commentText, commentBy });
    }
}
