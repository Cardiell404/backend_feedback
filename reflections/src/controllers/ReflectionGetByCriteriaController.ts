import httpStatus = require('http-status');
import { Request, Response } from 'express';
import { ReflectionResponse } from '../application/ReflectionResponse';
import { SearchReflectionByCriteriaQuery } from '../application/SearchByCriteria/SearchReflectionByCriteriaQuery';
import { Reflection } from '../domain/Reflection';
import { QueryBus } from "@__feedback__/shared";
import { Controller } from "./Controller";

type FilterType = { value: string; operator: string; field: string };

export class ReflectionGetByCriteriaController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, _res: Response): Promise<void> {
    const { query: queryParams, body } = _req;
    const { orderBy, order, limit, offset } = queryParams;
    const filters = body;

    const query = new SearchReflectionByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );
    const queryResponse: ReflectionResponse = await this.queryBus.ask<ReflectionResponse>(query);
    _res.status(httpStatus.OK).json(this.toResponse(queryResponse.reflection));
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

  private toResponse(reflection: Array<Reflection>) {
    return reflection.map(reflection => ({
      id: reflection.id.toString(),
      title: reflection.title!.toString(),
      description: reflection.description!.toString(),
      createDate: reflection?.createDate,
      additionalDetails: reflection.additionalDetails!.toString()
    }));
  }
}
