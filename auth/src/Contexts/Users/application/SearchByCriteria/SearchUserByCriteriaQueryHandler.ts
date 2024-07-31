import { Filters, Query, QueryHandler } from '@__feedback__/shared';
import { UserByCriteriaSearcher } from './UserByCriteriaSearcher';
import { UserResponse } from './UserResponse';
import { SearchUserByCriteriaQuery } from './SearchUserByCriteriaQuery';

export class SearchUserByCriteriaQueryHandler implements QueryHandler<SearchUserByCriteriaQuery, UserResponse> {

  constructor(private searcher: UserByCriteriaSearcher) {
  }

  subscribedTo(): Query {
    return SearchUserByCriteriaQuery;
  }

  handle(_query: SearchUserByCriteriaQuery): Promise<UserResponse> {
    const filters = Filters.fromValues(_query.filters);
    return this.searcher.run(filters);
  }
}
