import { DomainEvent } from "@__feedback__/shared";

type CreateConversationDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly createdBy?: string;
  readonly whoCanSee?: Array<string>
  readonly createDate?: Date;
  readonly hidden?: boolean;
  readonly additionalDetails?: string;
};

export class ConversationCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'conversation.created';

  readonly title?: string;
  readonly description?: string;
  readonly createDate?: Date;
  readonly createdBy?: string;
  readonly whoCanSee?: Array<string>;
  readonly additionalDetails?: string;
  readonly hidden?: boolean;

  constructor({
    aggregateId,
    title,
    description,
    createdBy,
    whoCanSee,
    createDate,
    additionalDetails,
    hidden,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    title?: string;
    description?: string;
    createdBy?: string; 
    whoCanSee?: Array<string>;
    createDate?: Date;
    additionalDetails?: string;
    hidden?: boolean;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({eventName: ConversationCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.title = title;
    this.description = description;
    this.createdBy = createdBy;
    this.whoCanSee = whoCanSee;
    this.createDate = createDate;
    this.additionalDetails = additionalDetails;
    this.hidden = hidden;
  }

  toPrimitives(): CreateConversationDomainEventBody {
    const { title, description, createDate, createdBy, whoCanSee, additionalDetails, hidden, aggregateId } = this;
    return {
      title,
      description,
      createdBy,
      whoCanSee,
      createDate,
      additionalDetails,
      hidden,
      eventName: ConversationCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(params: {
    aggregateId: string,
    attributes: CreateConversationDomainEventBody,
    eventId: string,
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new ConversationCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      description: attributes.description,
      additionalDetails: attributes.additionalDetails,
      createdBy: attributes.createdBy,
      whoCanSee: attributes.whoCanSee,
      createDate: attributes.createDate,
      hidden: attributes.hidden,
      eventId,
      occurredOn
    });
  }
}
