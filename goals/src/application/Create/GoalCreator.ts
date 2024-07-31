import { GoalTitle } from '../../domain/value-objects/GoalTitle';
import { GoalId } from '../../domain/value-objects/GoalId';
import { GoalDescription } from '../../domain/value-objects/GoalDescription';
import { GoalAttachments } from '../../domain/value-objects/GoalAttachments';
import { GoalRepository } from '../../domain/GoalRepository';
import { Goal } from '../../domain/Goal';
import { UserId } from '@__feedback__/shared';
import { GoalRichTextMessage } from '../../domain/value-objects/GoalRichTextMessage';
import { GoalStatus } from '../../domain/value-objects/GoalStatus';

type Params = {
  goalId: GoalId;
  goalTitle: GoalTitle;
  goalRichTextMessage: GoalRichTextMessage;
  goalDescription: GoalDescription;
  goalDueDate: Date;
  goalIsPrivate: boolean;
  goalAttachments: GoalAttachments;
  goalStatus: GoalStatus;
  goalCreatedBy: UserId;
  goalCreateDate: Date;
  goalHidden: boolean;
};


export class GoalCreator {
  private repository: GoalRepository;

  constructor(repository: GoalRepository) {
    this.repository = repository;
  }

  async run({ goalId, goalTitle, goalRichTextMessage, goalDescription, goalDueDate, goalIsPrivate, goalAttachments, goalStatus, goalCreatedBy, goalCreateDate, goalHidden }: Params): Promise<void> {
    const goal = Goal.create(goalId, goalTitle, goalRichTextMessage, goalDescription, goalDueDate, goalIsPrivate, goalAttachments, goalStatus, goalCreatedBy, goalCreateDate, goalHidden);
    await this.repository.save(goal);
  }
}
