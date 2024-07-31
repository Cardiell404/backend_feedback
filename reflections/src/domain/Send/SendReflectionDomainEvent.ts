import { DomainEvent } from "@__feedback__/shared";

type SendReflectionDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly message: string;
  readonly userId: string;
  readonly createDate?: Date;
};

export class SendReflectionDomainEvent extends DomainEvent {

  static readonly EVENT_NAME = 'send.reflection';

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
    super({eventName: SendReflectionDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.message = message;
    this.userId = userId;
    this.createDate = createDate;
  }

  toPrimitives(): SendReflectionDomainEventBody {
    const { message, userId, createDate, aggregateId } = this;
    return {
      message,
      userId,
      createDate,
      eventName: SendReflectionDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(params: {
    aggregateId: string,
    attributes: SendReflectionDomainEventBody,
    eventId: string,
    occurredOn: Date
  }): DomainEvent {
    const {aggregateId, attributes, eventId, occurredOn} = params;
    return new SendReflectionDomainEvent({
      aggregateId,
      message: attributes.message,
      userId: attributes.userId,
      createDate: attributes.createDate,
      eventId,
      occurredOn
    });
  }
}
