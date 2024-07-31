import { QueryBus } from '@__feedback__/shared';
import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { Controller } from './Controller';
import { EmployeeResponse } from '../application/SearchByCriteria/EmployeeResponse';
import { SearchEmployeeByCriteriaQuery } from '../application/SearchByCriteria/SearchEmployeeByCriteriaQuery';
import { FiltersMapping } from '../utils/FiltersMapping';

export class EmployeeGetByIdController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, _res: Response): Promise<void> {
    const query = new SearchEmployeeByCriteriaQuery(FiltersMapping.idAndHidden(_req.params.id));
    const queryResponse: EmployeeResponse = await this.queryBus.ask<EmployeeResponse>(query);
    _res.status(httpStatus.OK).json(queryResponse.toResponse());
  }

}
