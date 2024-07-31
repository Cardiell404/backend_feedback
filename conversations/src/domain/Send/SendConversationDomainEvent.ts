import { DomainEvent } from "@__feedback__/shared";

type SendConversationDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly conversationId: string;
  readonly text: string;
  readonly commentBy: string;
  readonly datePublished?: Date;
};

export class SendConversationDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'send.conversation';

  readonly conversationId: string;
  readonly text: string;
  readonly commentBy: string;
  readonly datePublished?: Date;

  constructor({
    aggregateId,
    conversationId,
    text,
    commentBy,
    datePublished,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    conversationId: string;
    text: string;
    commentBy: string;
    datePublished?: Date;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({eventName: SendConversationDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.conversationId = conversationId;
    this.text = text;
    this.commentBy = commentBy;
    this.datePublished = datePublished;
  }

  toPrimitives(): SendConversationDomainEventBody {
    const { conversationId, text, commentBy, datePublished, aggregateId } = this;
    return {
      conversationId,
      text,
      commentBy,
      datePublished,
      eventName: SendConversationDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: SendConversationDomainEventBody;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new SendConversationDomainEvent({
      aggregateId: aggregateId,
      conversationId: attributes.conversationId,
      text: attributes.text,
      commentBy: attributes.commentBy,
      datePublished: attributes.datePublished,
      eventId,
      occurredOn
    });
  }
}
