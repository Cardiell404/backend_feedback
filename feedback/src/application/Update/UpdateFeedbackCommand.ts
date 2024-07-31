import { Command } from "@__feedback__/shared";

type Params = {
    id: string;
    title?: string;
    description?: string;
    additionalDetails?: string; // attachs or goals.
    hidden?: boolean;
};

export class UpdateFeedbackCommand extends Command {
    id: string;
    title?: string;
    description?: string;
    createDate?: Date;
    additionalDetails?: string;
    hidden?: boolean;

    constructor({ id, title, description, additionalDetails, hidden }: Params) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.additionalDetails = additionalDetails;
        this.hidden = hidden;
    }
}
