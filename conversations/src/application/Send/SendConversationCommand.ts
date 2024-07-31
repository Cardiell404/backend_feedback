import { Command } from "@__feedback__/shared";

type Params = {
    id: string;
    conversationId: string
    text: string;
    commentBy: string;
    datePublished: Date;
};

export class SendConversationCommand extends Command {
    id: string;
    conversationId: string;
    text: string;
    datePublished?: Date;
    commentBy: string;

    constructor({ id, conversationId, text, datePublished, commentBy }: Params) {
        super();
        this.id = id;
        this.conversationId = conversationId;
        this.text = text;
        this.datePublished = datePublished;
        this.commentBy = commentBy
    }
}
