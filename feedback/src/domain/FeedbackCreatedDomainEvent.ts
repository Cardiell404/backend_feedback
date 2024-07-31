import { DomainEvent } from "@__feedback__/shared";

type CreateFeedbackDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly responses?: Array<{userId: string, message?: string, date?: Date}>;
  readonly createdBy?: string;
  readonly createDate?: Date;
  readonly hidden?: boolean;
  readonly additionalDetails?: string;
};

export class FeedbackCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'feedback.created';

  readonly title?: string;
  readonly description?: string;
  readonly responses?: Array<{userId: string, message?: string, date?: Date}>;
  readonly createDate?: Date;
  readonly createdBy?: string;
  readonly additionalDetails?: string;
  readonly hidden?: boolean;

  constructor({
    aggregateId,
    title,
    description,
    responses,
    createdBy,
    createDate,
    additionalDetails,
    hidden,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    title?: string;
    description?: string;
    responses?: Array<{userId: string, message?: string, date?: Date}>;
    createdBy?: string; 
    createDate?: Date;
    additionalDetails?: string;
    hidden?: boolean;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({eventName: FeedbackCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.title = title;
    this.description = description;
    this.responses = responses;
    this.createdBy = createdBy;
    this.createDate = createDate;
    this.additionalDetails = additionalDetails;
    this.hidden = hidden;
  }

  toPrimitives(): CreateFeedbackDomainEventBody {
    const { title, description, responses, createDate, createdBy, additionalDetails, hidden, aggregateId } = this;
    return {
      title,
      description,
      responses,
      createdBy,
      createDate,
      additionalDetails,
      hidden,
      eventName: FeedbackCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(params: {
    aggregateId: string,
    attributes: CreateFeedbackDomainEventBody,
    eventId: string,
    occurredOn: Date
  }): DomainEvent {
    const {aggregateId, eventId, occurredOn, attributes} = params;
    return new FeedbackCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      description: attributes.description,
      additionalDetails: attributes.additionalDetails,
      responses: attributes.responses,
      createdBy: attributes.createdBy,
      createDate: attributes.createDate,
      hidden: attributes.hidden,
      eventId,
      occurredOn
    });
  }
}
