import { Query } from '@__feedback__/shared';

export class SearchReflectionByCriteriaQuery implements Query {
  readonly filters: Array<Map<string, string>>;
  readonly orderBy?: string;
  readonly orderType?: string;
  readonly limit?: number;
  readonly offset?: number;

  constructor(
    filters: Array<Map<string, string>>,
    orderBy?: string,
    orderType?: string,
    limit?: number,
    offset?: number
  ) {
    this.filters = filters;
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.limit = limit;
    this.offset = offset;
  }
}
