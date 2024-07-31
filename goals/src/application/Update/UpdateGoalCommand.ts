import { Command } from "@__feedback__/shared";
import { Status } from "../../domain/value-objects/GoalStatus";


type Params = {
    id: string; 
    title?: string; 
    richTextMessage?: string;
    description?: string;
    dueDate?: Date;
    isPrivate?: boolean;
    attachments?: Array<string>;
    status?: Status;
    modifiedBy?: string;
    modifieDate?: Date;
    hidden?: boolean;
};
export class UpdateGoalCommand extends Command {
    id: string; 
    title?: string; 
    richTextMessage?: string;
    description?: string;
    dueDate?: Date;
    isPrivate?: boolean;
    attachments?: Array<string>;
    status?: Status;
    modifiedBy?: string;
    modifieDate?: Date;
    hidden?: boolean;

    constructor({ id, title, richTextMessage, description, dueDate, isPrivate, attachments, status, modifiedBy, modifieDate, hidden }: Params) {
        super();
        this.id = id;
        this.title = title;
        this.richTextMessage = richTextMessage;
        this.description = description;
        this.dueDate = dueDate;
        this.isPrivate = isPrivate;
        this.attachments = attachments;
        this.status = status;
        this.modifiedBy = modifiedBy;
        this.modifieDate = modifieDate;
        this.hidden = hidden;
    }
}
