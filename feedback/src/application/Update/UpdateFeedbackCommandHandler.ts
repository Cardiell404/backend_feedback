import { CommandHandler, Command } from "@__feedback__/shared";
import { FeedbackAdditionalDetails } from "../../domain/FeedbackAdditionalDetails";
import { FeedbackDescription } from "../../domain/FeedbackDescription";
import { FeedbackId } from "../../domain/FeedbackId";
import { FeedbackTitle } from "../../domain/FeedbackTitle";
import { FeedbackUpdater } from "./FeedbackUpdater";
import { UpdateFeedbackCommand } from "./UpdateFeedbackCommand";


export class UpdateFeedbackCommandHandler implements CommandHandler<UpdateFeedbackCommand> {
    constructor(private feedbackUpdater: FeedbackUpdater) {}

    subscribedTo(): Command {
        return UpdateFeedbackCommand;
    }

    async handle(command: UpdateFeedbackCommand): Promise<void> {
        const feedbackId = new FeedbackId(command.id);
        const feedbackTitle = command.title ? new FeedbackTitle(command.title) : undefined;
        const feedbackDescription = command.description ? new FeedbackDescription(command.description) : undefined;
        const feedbackAdditionalDetails = command.additionalDetails ? new FeedbackAdditionalDetails(command.additionalDetails) : undefined;
        const feedbackHidden = command.hidden;
        await this.feedbackUpdater.run({ feedbackId, feedbackTitle, feedbackDescription, feedbackAdditionalDetails, feedbackHidden });
    }
}
