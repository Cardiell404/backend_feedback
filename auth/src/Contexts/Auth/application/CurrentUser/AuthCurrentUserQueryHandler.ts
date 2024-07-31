import { Query } from '@__feedback__/shared';
import { AuthCurrentUserResponse } from './AuthCurrentUserResponse';
import { AuthCurrentUser } from './AuthCurrentUser';
import { AuthCurrentUserQuery } from './AuthCurrentUserQuery';

export class AuthCurrentUserQueryHandler {
    constructor(private AathCurrentUser: AuthCurrentUser) {}

    subscribedTo(): Query {
      return AuthCurrentUserQuery;
    }

    async handle(_query: AuthCurrentUserQuery): Promise<AuthCurrentUserResponse> {
      const {_id} = _query;
      return this.AathCurrentUser.run(_id);
    }
}
