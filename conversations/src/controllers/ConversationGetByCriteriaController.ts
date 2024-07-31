import httpStatus = require('http-status');
import { Request, Response } from 'express';
import { QueryBus } from '@__feedback__/shared';
import { Controller } from './Controller';
import { SearchConversationByCriteriaQuery } from '../application/SearchByCriteria/SearchConversationByCriteriaQuery';
import { ConversationResponse } from '../application/ConversationResponse';
import { Conversation } from '../domain/Conversation';


type FilterType = { value: string; operator: string; field: string };

export class ConversationGetByCriteriaController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, _res: Response): Promise<void> {
    const { query: queryParams, body } = _req;
    const { orderBy, order, limit, offset } = queryParams;
    const filters = body;

    const query = new SearchConversationByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );
    const queryResponse: ConversationResponse = await this.queryBus.ask<ConversationResponse>(query);
    _res.status(httpStatus.OK).json(this.toResponse(queryResponse.conversation));
  }

  private parseFilters(params: Array<FilterType>): Array<Map<string, string>> {
    if (Object.entries(params).length === 0) {
      return new Array<Map<string, string>>();
    }

    return params.map(filter => {
      const field = filter.field;
      const value = filter.value;
      const operator = filter.operator;

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value]
      ]);
    });
  }

  private toResponse(conversation: Array<Conversation>) {
    return conversation.map(conversation => conversation.toPrimitives());
  }
}
