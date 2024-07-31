import { DomainEvent } from "@__feedback__/shared";

type UpdateConversationDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly additionalDetails?: string;
  readonly hidden?: boolean;
};

export class ConversationUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'conversation.created';

  readonly title?: string;
  readonly description?: string;
  readonly additionalDetails?: string;
  readonly hidden?: boolean;

  constructor({ aggregateId, title, description, additionalDetails, hidden, eventId,  occurredOn }: {
    aggregateId: string;
    title?: string;
    description?: string;
    additionalDetails?: string;
    hidden?: boolean;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({eventName: ConversationUpdatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.title = title;
    this.description = description;
    this.additionalDetails = additionalDetails;
    this.hidden = hidden;
  }

  toPrimitives(): UpdateConversationDomainEventBody {
    const { title, description, additionalDetails, hidden, aggregateId } = this;
    return {
      title,
      description,
      additionalDetails,
      hidden,
      eventName: ConversationUpdatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives( params: {aggregateId: string, attributes: UpdateConversationDomainEventBody, eventId: string, occurredOn: Date} ): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ConversationUpdatedDomainEvent({
      aggregateId,
      title: attributes.title,
      description: attributes.description,
      additionalDetails: attributes.additionalDetails,
      hidden: attributes.hidden,
      eventId,
      occurredOn
    });
  }
}
