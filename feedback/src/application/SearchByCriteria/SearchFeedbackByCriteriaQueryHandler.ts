import { Query, QueryHandler, Order, Filters } from '@__feedback__/shared';
import { FeedbackResponse } from '../FeedbackResponse';
import { FeedbackByCriteriaSearcher } from './FeedbackByCriteriaSearcher';
import { SearchFeedbackByCriteriaQuery } from './SearchFeedbackByCriteriaQuery';

export class SearchFeedbackByCriteriaQueryHandler implements QueryHandler<SearchFeedbackByCriteriaQuery, FeedbackResponse> {
  constructor(private searcher: FeedbackByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchFeedbackByCriteriaQuery;
  }

  handle(query: SearchFeedbackByCriteriaQuery): Promise<FeedbackResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
