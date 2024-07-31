import { GoalAttachments } from './value-objects/GoalAttachments';
import { GoalId } from './value-objects/GoalId';
import { GoalTitle } from './value-objects/GoalTitle';
import { GoalDescription } from './value-objects/GoalDescription';
import { UserId, AggregateRoot } from '@__feedback__/shared';
import { GoalRichTextMessage } from './value-objects/GoalRichTextMessage';
import { GoalStatus, Status } from './value-objects/GoalStatus';


export class Goal extends AggregateRoot {
  
  readonly id: GoalId;
  readonly title?: GoalTitle;
  readonly richTextMessage?: GoalRichTextMessage;
  readonly description?: GoalDescription;
  readonly dueDate?: Date;
  readonly isPrivate?: boolean;
  readonly attachments?: GoalAttachments; //attachments
  readonly status?: GoalStatus; // OPENED and COMPLETED
  readonly createdBy?: UserId;
  readonly createdDate?: Date;
  readonly modifiedBy?: UserId;
  readonly modifiedDate?: Date;
  readonly hidden?: boolean;

  constructor({id, title, richTextMessage, description, dueDate, isPrivate, attachments, status, createdBy, createdDate, modifiedBy, modifiedDate, hidden}:{id: GoalId, title?: GoalTitle, richTextMessage?: GoalRichTextMessage, description?: GoalDescription, dueDate?: Date, isPrivate?: boolean, attachments?: GoalAttachments, status?: GoalStatus, createdBy?: UserId, createdDate?: Date, modifiedBy?: UserId, modifiedDate?: Date, hidden?: boolean}) {
    super();
    this.id = id;
    this.title = title;
    this.richTextMessage = richTextMessage;
    this.description = description;
    this.dueDate = dueDate;
    this.isPrivate = isPrivate
    this.attachments = attachments;
    this.status = status;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
    this.hidden = hidden;
  }

  static create(id: GoalId, title: GoalTitle, richTextMessage: GoalRichTextMessage, description: GoalDescription, dueDate: Date, isPrivate: boolean, attachments: GoalAttachments, status: GoalStatus, createdBy: UserId, createdDate: Date, hidden: boolean ): Goal {
    return new Goal({id, title, richTextMessage, description, dueDate, isPrivate, attachments, status, createdBy, createdDate, hidden});
  }

  static update(id: GoalId, title?: GoalTitle, richTextMessage?: GoalRichTextMessage, description?: GoalDescription, dueDate?: Date, isPrivate?: boolean, attachments?: GoalAttachments, status?: GoalStatus, modifiedBy?: UserId, modifiedDate?: Date, hidden?: boolean): Goal {
    return new Goal({id, title, richTextMessage, description, dueDate, isPrivate, attachments, status, modifiedBy, modifiedDate, hidden});
  }

  static fromPrimitives(plainData: { id: string; title: string; richTextMessage: string, description: string, dueDate: Date, isPrivate: boolean, attachments: Array<string>, status: Status,  createdBy: string, createdDate: Date, modifiedBy: string, modifiedDate: Date, hidden: boolean  }): Goal {
    return new Goal({
      id: new GoalId(plainData.id),
      title: new GoalTitle(plainData.title),
      richTextMessage: new GoalRichTextMessage(plainData.richTextMessage),
      description:new GoalDescription(plainData.description),
      dueDate: plainData.dueDate,
      isPrivate: plainData.isPrivate,
      attachments: new GoalAttachments(plainData.attachments),
      status: new GoalStatus(plainData.status),
      createdBy: new UserId(plainData.createdBy),
      createdDate: plainData.createdDate,
      modifiedBy: plainData.modifiedBy ? new UserId(plainData.modifiedBy) : undefined,
      modifiedDate: plainData.modifiedDate,
      hidden: plainData.hidden,
    });
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title?.value,
      richTextMessage: this.richTextMessage?.value,
      description: this.description?.value,
      dueDate: this.dueDate,
      isPrivate: this.isPrivate,
      attachments: this.attachments?.value,
      status: this.status?.value,
      createdBy: this.createdBy?.value,
      createdDate: this.createdDate,
      modifiedBy: this.modifiedBy?.value,
      modifiedDate: this.modifiedDate,
      hidden: this.hidden,
    };
  }
}
