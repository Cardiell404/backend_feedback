import { Command, CommandHandler, UserId } from "@__feedback__/shared";
import { GoalAttachments } from "../../domain/value-objects/GoalAttachments";
import { GoalDescription } from "../../domain/value-objects/GoalDescription";
import { GoalId } from "../../domain/value-objects/GoalId";
import { GoalTitle } from "../../domain/value-objects/GoalTitle";
import { GoalUpdater } from "./GoalUpdater";
import { UpdateGoalCommand } from "./UpdateGoalCommand";
import { GoalRichTextMessage } from "../../domain/value-objects/GoalRichTextMessage";
import { GoalStatus } from "../../domain/value-objects/GoalStatus";


export class UpdateGoalCommandHandler implements CommandHandler<UpdateGoalCommand> {
    constructor(private goalUpdater: GoalUpdater) {}

    subscribedTo(): Command {
        return UpdateGoalCommand;
    }

    async handle(command: UpdateGoalCommand): Promise<void> {
        const goalId = new GoalId(command.id);
        const goalTitle = command.title ? new GoalTitle(command.title) : undefined;
        const goalRichTextMessage = command.richTextMessage ? new GoalRichTextMessage(command.richTextMessage) : undefined;
        const goalDescription = command.description ? new GoalDescription(command.description) : undefined;
        const goalAttachments = command.attachments ? new GoalAttachments(command.attachments) : undefined;
        const goalIsPrivate = command.isPrivate;
        const goalDueDate = command.dueDate;
        const goalStatus = command.status ? new GoalStatus(command.status) : undefined;
        const goalModifiedBy = command.modifiedBy ? new UserId(command.modifiedBy) : undefined;
        const goalModifiedDate = command.modifieDate;
        const goalHidden = command.hidden;
        await this.goalUpdater.run({ goalId, goalTitle, goalRichTextMessage, goalDescription, goalDueDate, goalIsPrivate, goalAttachments, goalStatus, goalModifiedBy, goalModifiedDate, goalHidden });
    }
}
