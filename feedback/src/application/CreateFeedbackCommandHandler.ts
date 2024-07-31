import { FeedbackMesage } from './../domain/FeedbackMesage';
import { CreateFeedbackCommand } from './CreateFeedbackCommand';
import { FeedbackCreator } from './FeedbackCreator';
import { FeedbackId } from '../domain/FeedbackId';
import { FeedbackTitle } from '../domain/FeedbackTitle';
import { FeedbackDescription } from '../domain/FeedbackDescription';
import { FeedbackResponses } from '../domain/FeedbackResponses';
import { FeedbackAdditionalDetails } from '../domain/FeedbackAdditionalDetails';
import { Command, CommandHandler, UserId } from '@__feedback__/shared';
export class CreateFeedbackCommandHandler implements CommandHandler<CreateFeedbackCommand> {
    constructor(private feedbackCreator: FeedbackCreator) {}

    subscribedTo(): Command {
        return CreateFeedbackCommand;
    }

    async handle(command: CreateFeedbackCommand): Promise<void> {
        const feedbackId = new FeedbackId(command.id);
        const feedbackTitle = new FeedbackTitle(command.title);
        const feedbackCreateDate = command.createDate;
        const feedbackDescription = new FeedbackDescription(command.description);
        const feedbackResponses = new FeedbackResponses(command.responses.map((resp) => ({userId: new UserId(resp.userId), message: resp.message ? new FeedbackMesage(resp.message) : undefined, date: new Date()})));
        const feedbackCreatedBy = new UserId(command.createdBy);
        const feedbackAdditionalDetails = new FeedbackAdditionalDetails(command.additionalDetails);
        const feedbackHidden = command.hidden;
        await this.feedbackCreator.run({ feedbackId, feedbackTitle, feedbackDescription, feedbackResponses, feedbackCreatedBy, feedbackCreateDate, feedbackAdditionalDetails, feedbackHidden });
    }
}
