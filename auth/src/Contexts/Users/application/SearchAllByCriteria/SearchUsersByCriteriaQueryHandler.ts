
import { Query, QueryHandler, Order, Filters } from '@__feedback__/shared';
import { UsersByCriteriaSearcher } from './UsersByCriteriaSearcher';
import { SearchUsersByCriteriaQuery } from './SearchUsersByCriteriaQuery';
import { UsersResponse } from './UsersResponse';

export class SearchUsersByCriteriaQueryHandler implements QueryHandler<SearchUsersByCriteriaQuery, UsersResponse> {
  constructor(private searcher: UsersByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchUsersByCriteriaQuery;
  }

  handle(query: SearchUsersByCriteriaQuery): Promise<UsersResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
