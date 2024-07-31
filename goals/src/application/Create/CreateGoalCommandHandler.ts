import { CreateGoalCommand } from './CreateGoalCommand';
import { Command, CommandHandler, UserId } from '@__feedback__/shared';
import { GoalCreator } from './GoalCreator';
import { GoalId } from '../../domain/value-objects/GoalId';
import { GoalTitle } from '../../domain/value-objects/GoalTitle';
import { GoalDescription } from '../../domain/value-objects/GoalDescription';
import { GoalAttachments } from '../../domain/value-objects/GoalAttachments';
import { GoalRichTextMessage } from '../../domain/value-objects/GoalRichTextMessage';
import { GoalStatus } from '../../domain/value-objects/GoalStatus';

export class CreateGoalCommandHandler implements CommandHandler<CreateGoalCommand> {
    constructor(private goalCreator: GoalCreator) {}

    subscribedTo(): Command {
        return CreateGoalCommand;
    }

    async handle(command: CreateGoalCommand): Promise<void> {
        const goalId = new GoalId(command.id);
        const goalTitle = new GoalTitle(command.title);
        const goalRichTextMessage = new GoalRichTextMessage(command.richTextMessage);
        const goalDescription = new GoalDescription(command.description);
        const goalDueDate = command.dueDate;
        const goalIsPrivate = command.isPrivate
        const goalAttachments = new GoalAttachments(command.attachments);
        const goalStatus = new GoalStatus(command.status);
        const goalCreatedBy = new UserId(command.createdBy);
        const goalCreateDate = command.createdDate;
        const goalHidden = command.hidden;
        await this.goalCreator.run({ goalId, goalTitle, goalRichTextMessage, goalDescription, goalDueDate, goalIsPrivate, goalAttachments, goalStatus, goalCreatedBy, goalCreateDate, goalHidden });
    }
}
