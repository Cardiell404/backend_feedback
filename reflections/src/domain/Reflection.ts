import { AggregateRoot, UserId, GoalId } from '@__feedback__/shared';
import { ReflectionUpdatedDomainEvent } from './ReflectionUpdatedDomainEvent';
import { ReflectionTitle } from './ReflectionTitle';
import { ReflectionDescription } from './ReflectionDescription';
import { ReflectionId } from './ReflectionId';
import { ReflectionAdditionalDetails } from './ReflectionAdditionalDetails';
import { ReflectionCreatedDomainEvent } from './ReflectionCreatedDomainEvent';

export class Reflection extends AggregateRoot {
  readonly id: ReflectionId;
  readonly title?: ReflectionTitle;
  readonly detailReflection?: Date; // date_proyect
  readonly skills?: any[]; //TODO: Change type
  readonly Highlights?: GoalId[];
  readonly description?: ReflectionDescription;
  readonly additionalDetails?: ReflectionAdditionalDetails; //goal or attachments.
  readonly createdBy?: UserId;
  readonly createDate?: Date;
  readonly hidden?: boolean;

  constructor( {id, title, description, additionalDetails, createDate, createdBy, hidden}:{id: ReflectionId, title?: ReflectionTitle, description?: ReflectionDescription, additionalDetails?: ReflectionAdditionalDetails, hidden?: boolean,  createdBy?: UserId, createDate?: Date}) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.createDate = createDate;
    this.additionalDetails = additionalDetails;
    this.createdBy = createdBy;
    this.hidden = hidden;
  }

  static create(id: ReflectionId, title: ReflectionTitle,  description: ReflectionDescription, additionalDetails: ReflectionAdditionalDetails, createdBy?: UserId, createDate?: Date, hidden?: boolean): Reflection {
    const reflection = new Reflection({id, title, description, additionalDetails, hidden, createdBy, createDate});
    reflection.record(
      new ReflectionCreatedDomainEvent({
        aggregateId: reflection.id.value,
        title: reflection.title?.value,
        description: reflection.description?.value,
        additionalDetails: reflection.additionalDetails?.value,
        createDate: reflection.createDate,
        hidden: reflection.hidden,
      })
    );

    return reflection;
  }

  static update(id: ReflectionId, title?: ReflectionTitle,  description?: ReflectionDescription, additionalDetails?: ReflectionAdditionalDetails, hidden?: boolean): Reflection {
    const reflection = new Reflection({id, title, description, additionalDetails, hidden});
    reflection.record(
      new ReflectionUpdatedDomainEvent({
        aggregateId: reflection.id.value,
        title: reflection.title?.value,
        description: reflection.description?.value,
        additionalDetails: reflection.additionalDetails?.value,
        hidden: reflection.hidden,
      })
    );

    return reflection;
  }

  static fromPrimitives(plainData: { id: string; title: string; description: string, responses: Array<{userId: string, message?: string, date?: Date, name?: string, lastName: string, avatar?: string}>, createdBy?: string, createDate?: Date, additionalDetails: string, hidden?: boolean }): Reflection {
    return new Reflection({
      id: new ReflectionId(plainData.id),
      title: new ReflectionTitle(plainData.title),
      description: new ReflectionDescription(plainData.description),
      additionalDetails: new ReflectionAdditionalDetails(plainData.additionalDetails),
      hidden: plainData.hidden,
      createdBy: plainData.createdBy ? new UserId(plainData.createdBy): undefined,
      createDate: plainData.createDate,
    });
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title?.value,
      description: this.description?.value,
      createdBy: this.createdBy?.value,
      createDate: this.createDate,
      additionalDetails: this.additionalDetails?.value,
      hidden: this.hidden,
    };
  }
}
