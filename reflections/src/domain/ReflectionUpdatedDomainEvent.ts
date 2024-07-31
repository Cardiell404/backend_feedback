import { DomainEvent } from '@__feedback__/shared';

type UpdateReflectionDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly additionalDetails?: string;
  readonly hidden?: boolean;
};

export class ReflectionUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'reflection.created';

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
    super({eventName: ReflectionUpdatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn});
    this.title = title;
    this.description = description;
    this.additionalDetails = additionalDetails;
    this.hidden = hidden;
  }

  toPrimitives(): UpdateReflectionDomainEventBody {
    const { title, description, additionalDetails, hidden, aggregateId } = this;
    return {
      title,
      description,
      additionalDetails,
      hidden,
      eventName: ReflectionUpdatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives( params: {aggregateId: string, attributes: UpdateReflectionDomainEventBody, eventId: string, occurredOn: Date} ): DomainEvent {
    const {aggregateId, attributes, eventId, occurredOn} = params;
    return new ReflectionUpdatedDomainEvent({
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
