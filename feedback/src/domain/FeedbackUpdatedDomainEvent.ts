import { DomainEvent } from "@__feedback__/shared";

type UpdateFeedbackDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly additionalDetails?: string;
  readonly hidden?: boolean;
};

export class FeedbackUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'feedback.created';

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
    super({eventName: FeedbackUpdatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.title = title;
    this.description = description;
    this.additionalDetails = additionalDetails;
    this.hidden = hidden;
  }

  toPrimitives(): UpdateFeedbackDomainEventBody {
    const { title, description, additionalDetails, hidden, aggregateId } = this;
    return {
      title,
      description,
      additionalDetails,
      hidden,
      eventName: FeedbackUpdatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives( params: {aggregateId: string, attributes: UpdateFeedbackDomainEventBody, eventId: string, occurredOn: Date }): DomainEvent {
    const {aggregateId, eventId, occurredOn, attributes} = params;
    return new FeedbackUpdatedDomainEvent({
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
