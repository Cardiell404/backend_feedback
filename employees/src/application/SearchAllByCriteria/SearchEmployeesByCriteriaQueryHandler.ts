import { Query, QueryHandler, Order, Filters } from '@__feedback__/shared';
import { EmployeesResponse } from './EmployeesResponse';
import { EmployeesByCriteriaSearcher } from './EmployeesByCriteriaSearcher';
import { SearchEmployeesByCriteriaQuery } from './SearchEmployeesByCriteriaQuery';

export class SearchEmployeesByCriteriaQueryHandler implements QueryHandler<SearchEmployeesByCriteriaQuery, EmployeesResponse> {
  constructor(private searcher: EmployeesByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchEmployeesByCriteriaQuery;
  }

  handle(query: SearchEmployeesByCriteriaQuery): Promise<EmployeesResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
