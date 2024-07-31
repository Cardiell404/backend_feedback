import { Criteria, Filters, Order } from '@__feedback__/shared';
import { GoalRepository } from '../../domain/GoalRepository';
import { GoalsResponse } from './GoalsResponse';

export class GoalsByCriteriaSearcher {
  constructor(private repository: GoalRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<GoalsResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const employees = await this.repository.searchAll(criteria);
    return new GoalsResponse(employees);
  }
}
