import { CommandHandler, Command, UserId } from "@__feedback__/shared";
import { FeedbackId } from "../../domain/FeedbackId";
import { FeedbackMesage } from "../../domain/FeedbackMesage";
import { SendFeedbackCreator } from "./SendFeedbackCreator";
import { SendFeedbackCommand } from "./SendFeedbackCommand";

export class SendFeedbackCommandHandler implements CommandHandler<SendFeedbackCommand> {
    constructor(private feedbackCreator: SendFeedbackCreator) {}

    subscribedTo(): Command {
        return SendFeedbackCommand;
    }

    async handle(command: SendFeedbackCommand): Promise<void> {
        const feedbackId = new FeedbackId(command.id);
        const feedbackCreateDate = command.createDate;
        const feedbackMessage = new FeedbackMesage(command.message);
        const feedbackUserId = new UserId(command.userId);
        await this.feedbackCreator.run({ feedbackId, feedbackCreateDate, feedbackMessage, feedbackUserId });
    }
}
