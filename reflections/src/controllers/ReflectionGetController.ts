import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { ReflectionResponse } from '../application/ReflectionResponse';
import { FindReflectionQuery } from '../application/Find/FindReflectionQuery';
import { QueryBus } from "@__feedback__/shared";
import { Controller } from "./Controller";

export class ReflectionGetController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindReflectionQuery();
      const data = await this.queryBus.ask<ReflectionResponse>(query);
      res.status(httpStatus.OK).json(data);
    } catch (e) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
