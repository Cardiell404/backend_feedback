import { Query, QueryHandler, Order, Filters } from '@__feedback__/shared';
import { GoalsByCriteriaSearcher } from './GoalsByCriteriaSearcher';
import { SearchGoalsByCriteriaQuery } from './SearchGoalsByCriteriaQuery';
import { GoalsResponse } from './GoalsResponse';

export class SearchGoalsByCriteriaQueryHandler implements QueryHandler<SearchGoalsByCriteriaQuery, GoalsResponse> {
  constructor(private searcher: GoalsByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchGoalsByCriteriaQuery;
  }

  handle(query: SearchGoalsByCriteriaQuery): Promise<GoalsResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
