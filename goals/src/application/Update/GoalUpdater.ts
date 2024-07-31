import { Goal } from "../../domain/Goal";
import { GoalAttachments } from "../../domain/value-objects/GoalAttachments";
import { GoalDescription } from "../../domain/value-objects/GoalDescription";
import { GoalId } from "../../domain/value-objects/GoalId";
import { GoalRepository } from "../../domain/GoalRepository";
import { GoalTitle } from "../../domain/value-objects/GoalTitle";
import { GoalRichTextMessage } from "../../domain/value-objects/GoalRichTextMessage";
import { GoalStatus } from "../../domain/value-objects/GoalStatus";
import { UserId } from "@__feedback__/shared";
import { GoalNotExist } from "../../domain/errors/GoalNotExist";
import { FiltersMapping } from "../../utils/FiltersMapping";


type Params = {
  goalId: GoalId;
  goalTitle?: GoalTitle;
  goalRichTextMessage?: GoalRichTextMessage;
  goalDescription?: GoalDescription;
  goalDueDate?: Date;
  goalIsPrivate?: boolean;
  goalAttachments?: GoalAttachments;
  goalStatus?: GoalStatus;
  goalModifiedBy?: UserId;
  goalModifiedDate?: Date;
  goalHidden?: boolean;
};

export class GoalUpdater {
  private repository: GoalRepository;

  constructor(repository: GoalRepository) {
    this.repository = repository;
  }

  async run({ goalId, goalTitle, goalRichTextMessage, goalDescription, goalDueDate, goalIsPrivate, goalAttachments, goalStatus, goalModifiedBy, goalModifiedDate, goalHidden }: Params): Promise<void> {
    const goal = await this.repository.search(FiltersMapping.id(goalId.value));

    if(!goal) {
      throw new GoalNotExist();
    }

    const updateGoal = Goal.update(
        goalId, 
        goalTitle || goal.title, 
        goalRichTextMessage || goal.richTextMessage, 
        goalDescription || goal.description, 
        goalDueDate || goal.dueDate, 
        goalIsPrivate || goal.isPrivate, 
        goalAttachments || goal.attachments, 
        goalStatus || goal.status, 
        goalModifiedBy, 
        goalModifiedDate, 
        (goalHidden != undefined) ? goalHidden : goal.hidden, 
        );

      await this.repository.save(updateGoal);
  }
}
