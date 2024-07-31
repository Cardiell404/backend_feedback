import { QueryHandler, Query, Filters } from '@__feedback__/shared';
import { GoalByCriteriaSearcher } from './GoalByCriteriaSearcher';
import { GoalResponse } from './GoalResponse';
import { SearchGoalByCriteriaQuery } from './SearchGoalByCriteriaQuery';

export class SearchGoalByCriteriaQueryHandler implements QueryHandler<SearchGoalByCriteriaQuery, GoalResponse> {

  constructor(private criteriaSearcher: GoalByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchGoalByCriteriaQuery;
  }

  handle(query: SearchGoalByCriteriaQuery): Promise<GoalResponse> {
    const filters = Filters.fromValues(query.filters);
    return this.criteriaSearcher.run(filters);  
  }
}
