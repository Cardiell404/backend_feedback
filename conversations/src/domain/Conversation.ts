import { ConversationUpdatedDomainEvent } from './ConversationUpdatedDomainEvent';
import { ConversationTitle } from './ConversationTitle';
import { ConversationDescription } from './ConversationDescription';
import { ConversationId } from './ConversationId';
import { ConversationAdditionalDetails } from './ConversationAdditionalDetails';
import { ConversationCreatedDomainEvent } from './ConversationCreatedDomainEvent';
import { ConversationComments } from './ConversationComments';
import { CommentId } from './CommentId';
import { CommentText } from './CommentText';
import { ConversationWhoCanSee } from './ConversationWhoCanSee';
import { AggregateRoot, UserId } from '@__feedback__/shared';

export class Conversation extends AggregateRoot {
  readonly id: ConversationId;
  readonly title?: ConversationTitle;
  readonly description?: ConversationDescription;
  readonly comments?: ConversationComments;
  readonly additionalDetails?: ConversationAdditionalDetails; //goal or attachments.
  readonly createdBy?: UserId;
  readonly whoCanSee?: ConversationWhoCanSee;
  readonly createDate?: Date;
  readonly hidden?: boolean;

  constructor( {id, title, description, comments, additionalDetails, createDate, createdBy, whoCanSee, hidden}:{id: ConversationId, title?: ConversationTitle, description?: ConversationDescription, comments?: ConversationComments, additionalDetails?: ConversationAdditionalDetails, hidden?: boolean,  createdBy?: UserId, whoCanSee?: ConversationWhoCanSee, createDate?: Date}) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.comments = comments;
    this.createDate = createDate;
    this.additionalDetails = additionalDetails;
    this.createdBy = createdBy;
    this.whoCanSee = whoCanSee;
    this.hidden = hidden;
  }

  static create(id: ConversationId, title: ConversationTitle,  description: ConversationDescription, additionalDetails: ConversationAdditionalDetails, createdBy?: UserId, whoCanSee?: ConversationWhoCanSee, createDate?: Date, hidden?: boolean): Conversation {
    const conversation = new Conversation({id, title, description, additionalDetails, hidden, createdBy,whoCanSee, createDate});
    conversation.record(
      new ConversationCreatedDomainEvent({
        aggregateId: conversation.id.value,
        title: conversation.title?.value,
        description: conversation.description?.value,
        additionalDetails: conversation.additionalDetails?.value,
        createdBy: conversation.createdBy?.value,
        whoCanSee: conversation.whoCanSee?.value.map((id)=>id.toString()),
        createDate: conversation.createDate,
        hidden: conversation.hidden,
      })
    );

    return conversation;
  }

  static update(id: ConversationId, title?: ConversationTitle,  description?: ConversationDescription, additionalDetails?: ConversationAdditionalDetails, hidden?: boolean): Conversation {
    const conversation = new Conversation({id, title, description, additionalDetails, hidden});
    conversation.record(
      new ConversationUpdatedDomainEvent({
        aggregateId: conversation.id.value,
        title: conversation.title?.value,
        description: conversation.description?.value,
        additionalDetails: conversation.additionalDetails?.value,
        hidden: conversation.hidden,
      })
    );

    return conversation;
  }

  static fromPrimitives(plainData: { id: string; title: string; description: string, comments?: Array<{commentBy: string, datePublished: Date, text: string, id: string}>, createdBy?: string, whoCanSee?: Array<string>, createDate?: Date, additionalDetails: string, hidden?: boolean }): Conversation {
    return new Conversation({
      id: new ConversationId(plainData.id),
      title: new ConversationTitle(plainData.title),
      description: new ConversationDescription(plainData.description),
      comments: plainData.comments ? new ConversationComments(plainData.comments.map((comment)=>({
        commentBy: new UserId(comment.commentBy),
        datePublished: comment.datePublished,
        text: new CommentText(comment.text),
        id: new CommentId(comment.id)
      }))) : undefined,
      additionalDetails: new ConversationAdditionalDetails(plainData.additionalDetails),
      hidden: plainData.hidden,
      createdBy: plainData.createdBy ? new UserId(plainData.createdBy): undefined,
      whoCanSee: plainData.whoCanSee ? new ConversationWhoCanSee(plainData.whoCanSee.map((id) => new UserId(id) )) : undefined,
      createDate: plainData.createDate,
    });
  }

  toPrimitives() {
    return {
      id: this.id?.value,
      title: this.title?.value,
      description: this.description?.value,
      comments: this.comments?.value.map((comment)=> ({
        text: comment.text.toString(),
        commentBy: comment.commentBy.toString(),
        datePublished: comment.datePublished,
        id: comment.id.toString(),
      })),
      createdBy: this.createdBy?.value,
      whoCanSee: this.whoCanSee?.value.map((id)=>id.toString()),
      createDate: this.createDate,
      additionalDetails: this.additionalDetails?.value,
      hidden: this.hidden,
    };
  }
}
