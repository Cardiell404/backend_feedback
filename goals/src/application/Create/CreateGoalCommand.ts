import { Command } from '@__feedback__/shared';
import { Status } from '../../domain/value-objects/GoalStatus';

type Params = {
    id: string; 
    title: string; 
    richTextMessage: string;
    description: string;
    dueDate: Date;
    isPrivate: boolean;
    attachments: Array<string>;
    status: Status;
    createdBy: string;
    createdDate: Date;
    hidden: boolean;
};

export class CreateGoalCommand extends Command {
    id: string; 
    title: string; 
    richTextMessage: string;
    description: string;
    dueDate: Date;
    isPrivate: boolean;
    attachments: Array<string>;
    status: Status;
    createdBy: string;
    createdDate: Date;
    hidden: boolean;

    constructor({ id, title, richTextMessage, description, dueDate, isPrivate, attachments, status, createdBy, createdDate, hidden }: Params) {
        super();
        this.id = id;
        this.title = title;
        this.richTextMessage = richTextMessage;
        this.description = description;
        this.dueDate = dueDate;
        this.isPrivate = isPrivate;
        this.attachments = attachments;
        this.status = status;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.hidden = hidden;
    }
}
