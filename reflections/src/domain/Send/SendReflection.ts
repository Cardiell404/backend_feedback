import { ReflectionMessage } from '../ReflectionMessage';
import { AggregateRoot, UserId } from "@__feedback__/shared";
import { ReflectionId } from '../ReflectionId';
import { SendReflectionDomainEvent } from './SendReflectionDomainEvent';

export class SendReflection extends AggregateRoot {
  readonly id: ReflectionId;
  readonly message: ReflectionMessage;
  readonly userId: UserId; //goal or attachments.
  readonly createDate?: Date;

  constructor(id: ReflectionId, message: ReflectionMessage, userId: UserId, createDate?: Date) {
    super();
    this.id = id;
    this.message = message;
    this.userId = userId;
    this.createDate = createDate;
  }

  static create(id: ReflectionId, message: ReflectionMessage, userId: UserId, createDate?: Date): SendReflection {
    const reflection = new SendReflection(id, message, userId, createDate);
    reflection.record(
      new SendReflectionDomainEvent({
        aggregateId: reflection.id.value,
        message: reflection.message.value,
        userId: reflection.userId.value,
        createDate: reflection.createDate,
      })
    );

    return reflection;
  }

  static fromPrimitives(plainData: { id: string; message: string; createDate: Date, userId: string }): SendReflection {
    return new SendReflection(
      new ReflectionId(plainData.id),
      new ReflectionMessage(plainData.message),
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
