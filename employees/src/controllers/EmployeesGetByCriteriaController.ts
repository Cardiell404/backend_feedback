import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { EmployeesResponse } from '../application/SearchAllByCriteria/EmployeesResponse';
import { SearchEmployeesByCriteriaQuery } from '../application/SearchAllByCriteria/SearchEmployeesByCriteriaQuery';
import { Employee } from '../domain/Employee';
import { QueryBus } from '@__feedback__/shared';
import { Controller } from './Controller';

type FilterType = { value: string; operator: string; field: string };

export class EmployeesGetByCriteriaController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, _res: Response): Promise<void> {
    const { query: queryParams, body } = _req;
    const { orderBy, order, limit, offset } = queryParams;
    const filters = body;

    const query = new SearchEmployeesByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );
    const queryResponse: EmployeesResponse = await this.queryBus.ask<EmployeesResponse>(query);
    _res.status(httpStatus.OK).json(this.toResponse(queryResponse.employees));
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

  private toResponse(employees: Array<Employee>) {
    return employees.map(employee => ({
      id: employee.id.toString(),
      name: employee.name?.toString(),
      lastName: employee.lastName?.toString(),
      manager: employee.manager?.toString(),
      age: employee.age?.value,
      curp: employee.curp?.toString(),
      nss: employee.nss?.toString(),
      rfc: employee.rfc?.toString(),
      employeeNumber: employee.number?.toString(),
      email: employee.email?.toString(),
      phoneNumber: employee.phoneNumber?.toString(),
      birthday: employee.birthday?.toString(),
      isManager: employee.isManager,
      createdBy: employee.createdBy?.toString(),
      createDate: employee.createDate,
      hidden: employee.hidden,
      staff: employee.staff?.map((staff => staff.value )),
    }));
  }
}
