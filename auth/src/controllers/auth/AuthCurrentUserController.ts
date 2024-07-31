import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { QueryBus } from '@__feedback__/shared';
import { AuthCurrentUserResponse } from '../../Contexts/Auth/application/CurrentUser/AuthCurrentUserResponse';
import { AuthCurrentUserQuery } from '../../Contexts/Auth/application/CurrentUser/AuthCurrentUserQuery';

export class AuthCurrentUserController {
  constructor(private queryBus: QueryBus) {
  }

  async run(_req: Request, _res: Response) {
    console.log('currentUser: '+_req.currentUser?.id || '');
    const queryResponse: AuthCurrentUserResponse = await this.queryBus.ask<AuthCurrentUserResponse>(new AuthCurrentUserQuery(_req.currentUser!.id));
    _res.status(httpStatus.OK).json(queryResponse.user);
  }
}
