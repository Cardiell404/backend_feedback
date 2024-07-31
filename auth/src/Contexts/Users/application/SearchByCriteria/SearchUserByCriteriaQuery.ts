import { Query } from "@__feedback__/shared";

export class SearchUserByCriteriaQuery implements Query {
  readonly filters: Array<Map<string, string>>;

  constructor(filters: Array<Map<string, string>>) {
    this.filters = filters;

  }
}