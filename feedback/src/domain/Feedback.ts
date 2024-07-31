import { AggregateRoot, UserId } from '@__feedback__/shared';
import { FeedbackUpdatedDomainEvent } from './FeedbackUpdatedDomainEvent';
import { FeedbackTitle } from './FeedbackTitle';
import { FeedbackDescription } from './FeedbackDescription';
import { FeedbackId } from './FeedbackId';
import { FeedbackResponses } from './FeedbackResponses';
import { FeedbackMesage } from './FeedbackMesage'; 
import { FeedbackAdditionalDetails } from './FeedbackAdditionalDetails';
import { FeedbackCreatedDomainEvent } from './FeedbackCreatedDomainEvent';

export class Feedback extends AggregateRoot {
  readonly id: FeedbackId;
  readonly title?: FeedbackTitle;
  readonly description?: FeedbackDescription;
  readonly additionalDetails?: FeedbackAdditionalDetails; //goal or attachments.
  readonly responses?: FeedbackResponses;
  readonly createdBy?: UserId;
  readonly createDate?: Date;
  readonly hidden?: boolean;

  constructor( {id, title, description, additionalDetails, responses, createDate, createdBy, hidden}:{id: FeedbackId, title?: FeedbackTitle, description?: FeedbackDescription, additionalDetails?: FeedbackAdditionalDetails, hidden?: boolean, responses?: FeedbackResponses,  createdBy?: UserId, createDate?: Date}) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.responses = responses;
    this.createDate = createDate;
    this.additionalDetails = additionalDetails;
    this.createdBy = createdBy;
    this.hidden = hidden;
  }

  static create(id: FeedbackId, title: FeedbackTitle,  description: FeedbackDescription, additionalDetails: FeedbackAdditionalDetails, responses?: FeedbackResponses, createdBy?: UserId, createDate?: Date, hidden?: boolean): Feedback {
    const feedback = new Feedback({id, title, description, additionalDetails, hidden, responses, createdBy, createDate});
    feedback.record(
      new FeedbackCreatedDomainEvent({
        aggregateId: feedback.id.value,
        title: feedback.title?.value,
        description: feedback.description?.value,
        responses: feedback?.responses?.value.map((resp) => ({ userId: resp.userId.value, date: resp.date})),
        additionalDetails: feedback.additionalDetails?.value,
        createDate: feedback.createDate,
        hidden: feedback.hidden,
      })
    );

    return feedback;
  }

  static update(id: FeedbackId, title?: FeedbackTitle,  description?: FeedbackDescription, additionalDetails?: FeedbackAdditionalDetails, hidden?: boolean): Feedback {
    const feedback = new Feedback({id, title, description, additionalDetails, hidden});
    feedback.record(
      new FeedbackUpdatedDomainEvent({
        aggregateId: feedback.id.value,
        title: feedback.title?.value,
        description: feedback.description?.value,
        additionalDetails: feedback.additionalDetails?.value,
        hidden: feedback.hidden,
      })
    );

    return feedback;
  }

  static fromPrimitives(plainData: { id: string; title: string; description: string, responses: Array<{userId: string, message?: string, date?: Date, name?: string, lastName: string, avatar?: string}>, createdBy?: string, createDate?: Date, additionalDetails: string, hidden?: boolean }): Feedback {
    return new Feedback({
      id: new FeedbackId(plainData.id),
      title: new FeedbackTitle(plainData.title),
      description: new FeedbackDescription(plainData.description),
      additionalDetails: new FeedbackAdditionalDetails(plainData.additionalDetails),
      hidden: plainData.hidden,
      responses: new FeedbackResponses(plainData.responses?.map((resp) => ({message: resp.message ? new FeedbackMesage(resp?.message) : undefined, userId: new UserId(resp.userId), date: resp.date, name: resp.name, lastName: resp.lastName, avatar: resp.avatar}))),
      createdBy: plainData.createdBy ? new UserId(plainData.createdBy): undefined,
      createDate: plainData.createDate,
    });
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title?.value,
      description: this.description?.value,
      responses: this.responses?.value.map(feedback => ({
        message: feedback.message?.value,
        userId: feedback.userId.value,
        date: feedback.date,
        name: feedback.name,
        lastName: feedback.lastName,
        avatar: feedback.avatar,
      })),
      createdBy: this.createdBy?.value,
      createDate: this.createDate,
      additionalDetails: this.additionalDetails?.value,
      hidden: this.hidden,
    };
  }
}
