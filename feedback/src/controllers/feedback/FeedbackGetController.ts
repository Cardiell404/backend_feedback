import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { FeedbackResponse } from '../../application/FeedbackResponse';
import { FindFeedbackQuery } from '../../application/Find/FindFeedbackQuery';
import { QueryBus } from "@__feedback__/shared";
import { Controller } from "../Controller";

export class FeedbackGetController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindFeedbackQuery();
      const data = await this.queryBus.ask<FeedbackResponse>(query);
      res.status(httpStatus.OK).json(data);
    } catch (e) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
