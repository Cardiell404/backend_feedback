import { Command } from "@__feedback__/shared";

type Params = {
    id: string;
    message: string;
    userId: string;
};

export class SendReflectionCommand extends Command {
    id: string;
    message: string;
    createDate?: Date;
    userId: string;

    constructor({ id, message, userId }: Params) {
        super();
        this.id = id;
        this.message = message;
        this.createDate = new Date();
        this.userId = userId
    }
}
