import { Command } from '@__feedback__/shared';

type Params = {
    id: string;
    title: string;
    description: string;
    responses: Array<{userId: string, message?: string, date?: Date}>;
    createdBy: string;
    createDate?: Date;
    hidden: boolean;
    additionalDetails: string; // attachs or goals.
};

export class CreateReflectionCommand extends Command {
    id: string;
    title: string;
    description: string;
    responses: Array<{userId: string, message?: string, date?: Date}>;
    createdBy: string;
    createDate?: Date;
    additionalDetails: string;
    hidden: boolean;

    constructor({ id, title, description, responses, createdBy, createDate, additionalDetails, hidden }: Params) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.responses = responses;
        this.createdBy = createdBy;
        this.createDate = createDate;
        this.additionalDetails = additionalDetails;
        this.hidden = hidden;
    }
}
