import { SendConversation } from '../../domain/Send/SendConversation';
import { ConversationId } from "../../domain/ConversationId";
import { ConversationRepository } from "../../domain/ConversationRepository";
import { CommentId } from '../../domain/CommentId';
import { CommentText } from '../../domain/CommentText';
import { UserId } from '@__feedback__/shared';

type Params = {
  conversationId: ConversationId;
  commentId: CommentId,
  commentText: CommentText;
  commentBy: UserId
  commentDatePublished?: Date;
};


export class SendConversationCreator {
  private repository: ConversationRepository;

  constructor(repository: ConversationRepository) {
    this.repository = repository;
  }

  async run({ conversationId, commentId, commentText, commentDatePublished, commentBy }: Params): Promise<void> {
    const sendConversation = SendConversation.create(commentId, conversationId, commentText,commentBy, commentDatePublished);
    await this.repository.send(sendConversation);
  }
}
