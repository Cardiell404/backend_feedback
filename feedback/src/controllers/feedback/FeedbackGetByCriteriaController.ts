import httpStatus = require('http-status');
import { Request, Response } from 'express';
import { QueryBus } from "@__feedback__/shared";
import { Controller } from "../Controller";
import { SearchFeedbackByCriteriaQuery } from '../../application/SearchByCriteria/SearchFeedbackByCriteriaQuery';
import { FeedbackResponse } from '../../application/FeedbackResponse';
import { Feedback } from '../../domain/Feedback';

type FilterType = { value: string; operator: string; field: string };

export class FeedbackGetByCriteriaController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, _res: Response): Promise<void> {
    const { query: queryParams, body } = _req;
    const { orderBy, order, limit, offset } = queryParams;
    const filters = body;

    const query = new SearchFeedbackByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );
    const queryResponse: FeedbackResponse = await this.queryBus.ask<FeedbackResponse>(query);
    _res.status(httpStatus.OK).json(this.toResponse(queryResponse.feedback));
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

  private toResponse(feedback: Array<Feedback>) {
    return feedback.map(feedback => ({
      id: feedback.id.toString(),
      title: feedback.title!.toString(),
      responses: feedback.responses?.value.map((resp)=>({
          message: resp.message?.toString(),
          date: resp.date,
          userId: resp.userId.toString(),
          name: resp.name,
          lastName: resp.lastName,
          avatar: resp.avatar
        })),
      description: feedback.description!.toString(),
      createDate: feedback?.createDate,
      additionalDetails: feedback.additionalDetails!.toString()
    }));
  }
}
