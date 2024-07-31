import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { QueryBus } from "@__feedback__/shared";
import { Controller } from "./Controller";
import { FindConversationQuery } from '../application/Find/FindConversationQuery';
import { ConversationResponse } from '../application/ConversationResponse';

export class ConversationGetController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindConversationQuery();
      const data = await this.queryBus.ask<ConversationResponse>(query);
      res.status(httpStatus.OK).json(data);
    } catch (e) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
