import { Filters, Query, QueryHandler } from '@__feedback__/shared';
import { EmployeeResponse } from './EmployeeResponse';
import { EmployeeByCriteriaSearcher } from './EmployeeByCriteriaSearcher';
import { SearchEmployeeByCriteriaQuery } from './SearchEmployeeByCriteriaQuery';

export class SearchEmployeeByCriteriaQueryHandler implements QueryHandler<SearchEmployeeByCriteriaQuery, EmployeeResponse> {

  constructor(private criteriaSearcher: EmployeeByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchEmployeeByCriteriaQuery;
  }

  handle(query: SearchEmployeeByCriteriaQuery): Promise<EmployeeResponse> {
    const filters = Filters.fromValues(query.filters);
    return this.criteriaSearcher.run(filters);
  }
}