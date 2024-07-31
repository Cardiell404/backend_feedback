import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { SearchGoalsByCriteriaQuery } from '../application/SearchAllByCriteria/SearchGoalsByCriteriaQuery';
import { Goal } from '../domain/Goal';
import { QueryBus } from '@__feedback__/shared';
import { Controller } from './Controller';
import { GoalsResponse } from '../application/SearchAllByCriteria/GoalsResponse';

type FilterType = { value: string; operator: string; field: string };

export class GoalsGetByCriteriaController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, _res: Response): Promise<void> {
    const { query: queryParams, body } = _req;
    const { orderBy, order, limit, offset } = queryParams;
    const filters = body;

    const query = new SearchGoalsByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );
    const queryResponse: GoalsResponse = await this.queryBus.ask<GoalsResponse>(query);
    _res.status(httpStatus.OK).json(this.toResponse(queryResponse.goals));
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

  private toResponse(goals: Array<Goal>) {
    return goals.map(goal => ({
      id: goal.id.toString(),
      title: goal.title?.toString(),
      richTextMessage: goal.richTextMessage?.toString(),
      description: goal.description?.toString(),
      dueDate: goal.dueDate?.toString(),
      isPrivate: goal.isPrivate,
      attachments: goal.attachments?.toString(),
      status: goal.status?.value,
      createdBy: goal.createdBy?.value,
      createdDate: goal.createdDate,
      modifiedBy: goal.modifiedBy?.value,
      modifiedDate: goal.modifiedDate,
      hidden: goal.hidden,
    }));
  }
}