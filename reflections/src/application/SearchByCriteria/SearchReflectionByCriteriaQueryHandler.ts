import { Filters, Order, Query, QueryHandler } from '@__feedback__/shared';
import { ReflectionResponse } from '../ReflectionResponse';
import { ReflectionByCriteriaSearcher } from './ReflectionByCriteriaSearcher';
import { SearchReflectionByCriteriaQuery } from './SearchReflectionByCriteriaQuery';

export class SearchReflectionByCriteriaQueryHandler implements QueryHandler<SearchReflectionByCriteriaQuery, ReflectionResponse> {
  constructor(private searcher: ReflectionByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchReflectionByCriteriaQuery;
  }

  handle(query: SearchReflectionByCriteriaQuery): Promise<ReflectionResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);
    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
