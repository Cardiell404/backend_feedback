import { FeedbackMesage } from '../FeedbackMesage';
import { AggregateRoot, UserId } from "@__feedback__/shared";
import { FeedbackId } from '../FeedbackId';
import { SendFeedbackDomainEvent } from './SendFeedbackDomainEvent';

export class SendFeedback extends AggregateRoot {
  readonly id: FeedbackId;
  readonly message: FeedbackMesage;
  readonly userId: UserId; //goal or attachments.
  readonly createDate?: Date;

  constructor(id: FeedbackId, message: FeedbackMesage, userId: UserId, createDate?: Date) {
    super();
    this.id = id;
    this.message = message;
    this.userId = userId;
    this.createDate = createDate;
  }

  static create(id: FeedbackId, message: FeedbackMesage, userId: UserId, createDate?: Date): SendFeedback {
    const feedback = new SendFeedback(id, message, userId, createDate);
    feedback.record(
      new SendFeedbackDomainEvent({
        aggregateId: feedback.id.value,
        message: feedback.message.value,
        userId: feedback.userId.value,
        createDate: feedback.createDate,
      })
    );

    return feedback;
  }

  static fromPrimitives(plainData: { id: string; message: string; createDate: Date, userId: string }): SendFeedback {
    return new SendFeedback(
      new FeedbackId(plainData.id),
      new FeedbackMesage(plainData.message),
      new UserId(plainData.userId),
      plainData.createDate,
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      message: this.message.value,
      userId: this.userId.value,
      createDate: this.createDate,
    };
  }
}
