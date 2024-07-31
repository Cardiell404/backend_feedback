import { Command } from "@__feedback__/shared";

type Params = {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    whoCanSee: Array<string>;
    createDate?: Date;
    hidden: boolean;
    additionalDetails: string; // attachs or goals.
};

export class CreateConversationCommand extends Command {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    whoCanSee: Array<string>;
    createDate?: Date;
    additionalDetails: string;
    hidden: boolean;

    constructor({ id, title, description, createdBy, whoCanSee, createDate, additionalDetails, hidden }: Params) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.whoCanSee = whoCanSee;
        this.createDate = createDate;
        this.additionalDetails = additionalDetails;
        this.hidden = hidden;
    }
}
