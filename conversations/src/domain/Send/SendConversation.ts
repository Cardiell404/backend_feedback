import { CommentText } from '../CommentText';
import { ConversationId } from '../ConversationId';
import { SendConversationDomainEvent } from './SendConversationDomainEvent';
import { CommentId } from '../CommentId';
import { AggregateRoot, UserId } from '@__feedback__/shared';

export class SendConversation extends AggregateRoot {
  readonly id: CommentId;
  readonly conversationId: ConversationId
  readonly text: CommentText;
  readonly commentBy: UserId; //goal or attachments.
  readonly datePublished?: Date;


  constructor(id: CommentId, conversationId: ConversationId, text: CommentText, commentBy: UserId, datePublished?: Date) {
    super();
    this.id = id;
    this.conversationId = conversationId;
    this.text = text;
    this.commentBy = commentBy;
    this.datePublished = datePublished;
  }

  static create(id: ConversationId, conversationId: ConversationId, text: CommentText, commentBy: UserId, datePublished?: Date): SendConversation {
    const conversation = new SendConversation(id, conversationId, text, commentBy, datePublished);
    conversation.record(
      new SendConversationDomainEvent({
        aggregateId: conversation.id.value,
        conversationId: conversation.conversationId.value,
        text: conversation.text.value,
        commentBy: conversation.commentBy.value,
        datePublished: conversation.datePublished,
      })
    );

    return conversation;
  }

  static fromPrimitives(plainData: { id: string, conversationId: string; text: string; datePublished: Date, commentBy: string }): SendConversation {
    return new SendConversation(
      new CommentId(plainData.id),
      new ConversationId(plainData.conversationId),
      new CommentText(plainData.text),
      new UserId(plainData.commentBy),
      plainData.datePublished,
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      conversationId: this.conversationId.value,
      text: this.text.value,
      commentBy: this.commentBy.value,
      datePublished: this.datePublished,
    };
  }
}
