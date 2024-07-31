import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { QueryBus } from '@__feedback__/shared';
import { Controller } from '../Controller';
import { SearchUsersByCriteriaQuery } from '../../Contexts/Users/application/SearchAllByCriteria/SearchUsersByCriteriaQuery';
import { UsersResponse } from '../../Contexts/Users/application/SearchAllByCriteria/UsersResponse';
import { User } from '../../Contexts/Users/domain/User';

type FilterType = { value: string; operator: string; field: string };

export class UsersGetByCriteriaController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, _res: Response): Promise<void> {
    const { query: queryParams, body } = _req;
    const { orderBy, order, limit, offset } = queryParams;
    const filters = body;

    const query = new SearchUsersByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );
    const queryResponse: UsersResponse = await this.queryBus.ask<UsersResponse>(query);
    _res.status(httpStatus.OK).json(this.toResponse(queryResponse.users));
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
  
  private toResponse(users: Array<User>) {
    return users.map(user => ({
      id: user.id.toString(),
      username: user.username?.toString(),
      email: user.email?.toString(),
      avatar: user.avatar?.toString(),
      rol: user.rol?.toString(),
      fullName: `${user.employee?.name.value} ${user.employee?.lastName.value}`,
      hidden: user.hidden,
      cretedDate: user.createDate,
      createdBy: user.createdBy?.toString(),
    }));
  }
}
