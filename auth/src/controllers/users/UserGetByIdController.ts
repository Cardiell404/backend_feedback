import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { QueryBus } from '@__feedback__/shared';
import { Controller } from '../Controller';
import { FiltersMapping } from '../../utils/FiltersMapping';
import { SearchUserByCriteriaQuery } from '../../Contexts/Users/application/SearchByCriteria/SearchUserByCriteriaQuery';
import { UserResponse } from '../../Contexts/Users/application/SearchByCriteria/UserResponse';


export class UserGetByIdController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, res: Response): Promise<void> {
    const query = new SearchUserByCriteriaQuery(FiltersMapping.idAndHidden(_req.params.id));
    const data = await this.queryBus.ask<UserResponse>(query);
    res.status(httpStatus.OK).json(data.toResponse());
  }
}
