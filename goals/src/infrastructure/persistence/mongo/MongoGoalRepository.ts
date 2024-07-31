import { IGoal } from '../../../domain/IGoal';
import { Goal } from '../../../domain/Goal';
import { GoalRepository } from '../../../domain/GoalRepository';
import { Nullable, Criteria, MongoRepository, Filters } from '@__feedback__/shared';

export class MongoGoalRepository extends MongoRepository<Goal> implements GoalRepository {

  public save(goal: Goal): Promise<void> {
    return this.persist(goal.id.value, goal);
  }

  public async search(filters: Filters): Promise<Nullable<Goal>> {
    const document = await this.searchByCriteria<IGoal>(filters);
    return document ? Goal.fromPrimitives({ 
      id: document._id,
      title: document.title,
      richTextMessage: document.richTextMessage,
      description: document.description,
      dueDate: document.dueDate,
      isPrivate: document.isPrivate,
      attachments: document.attachments,
      status: document.status,
      createdBy: document.createdBy,
      createdDate: document.createdDate,
      modifiedBy: document.modifiedBy,
      modifiedDate: document.modifiedDate,
      hidden: document.hidden
     }) : null;
  }

  public async searchAll(criteria: Criteria): Promise<Array<Goal>> {
    const documents = await this.searchAllByCriteria<IGoal>(criteria);
    console.log(documents);
    return documents.map((goal) => Goal.fromPrimitives({ 
      id: goal._id,
      title: goal.title,
      richTextMessage: goal.richTextMessage,
      description: goal.description,
      dueDate: goal.dueDate,
      isPrivate: goal.isPrivate,
      attachments: goal.attachments,
      status: goal.status,
      createdBy: goal.createdBy,
      createdDate: goal.createdDate,
      modifiedBy: goal.modifiedBy,
      modifiedDate: goal.modifiedDate,
      hidden: goal.hidden
     }))
  }

  protected moduleName(): string {
    return 'goals';
  }
}
