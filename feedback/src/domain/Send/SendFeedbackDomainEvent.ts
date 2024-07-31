import { DomainEvent } from "@__feedback__/shared";

type SendFeedbackDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly message: string;
  readonly userId: string;
  readonly createDate?: Date;
};

export class SendFeedbackDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'send.feedback';

  readonly message: string;
  readonly userId: string;
  readonly createDate?: Date;

  constructor({
    aggregateId,
    message,
    userId,
    createDate,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    message: string;
    userId: string;
    createDate?: Date;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({eventName: SendFeedbackDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.message = message;
    this.userId = userId;
    this.createDate = createDate;
  }

  toPrimitives(): SendFeedbackDomainEventBody {
    const { message, userId, createDate, aggregateId } = this;
    return {
      message,
      userId,
      createDate,
      eventName: SendFeedbackDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(params: {
    aggregateId: string,
    attributes: SendFeedbackDomainEventBody,
    eventId: string,
    occurredOn: Date
  }): DomainEvent {
    const {aggregateId, eventId, occurredOn, attributes} = params;
    return new SendFeedbackDomainEvent({
      aggregateId,
      message: attributes.message,
      userId: attributes.userId,
      createDate: attributes.createDate,
      eventId,
      occurredOn
    });
  }
}
