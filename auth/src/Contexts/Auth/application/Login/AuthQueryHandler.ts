import { AuthLoginResponse } from './AuthLoginResponse';
import { AuthQuery } from './AuthQuery';
import { AuthLogin } from './AuthLogin';
import { Query } from '@__feedback__/shared';

export class AuthQueryHandler {
    constructor(private authLogin: AuthLogin) {}

    subscribedTo(): Query {
      return AuthQuery;
    }

    async handle(_query: AuthQuery): Promise<AuthLoginResponse> {
      const {email, password} = _query;
      return this.authLogin.run(email, password );
    }
}
