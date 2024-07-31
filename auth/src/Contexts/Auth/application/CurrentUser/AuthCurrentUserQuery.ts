import { Query } from "@__feedback__/shared";

export class AuthCurrentUserQuery extends Query {
  _id: string;

  constructor(_id: string) {
      super();
      this._id = _id;
  }
}
