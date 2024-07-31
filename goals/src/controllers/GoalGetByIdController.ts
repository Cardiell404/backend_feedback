import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { QueryBus } from '@__feedback__/shared';
import { Controller } from './Controller';
import { GoalResponse } from '../application/SearchByCriteria/GoalResponse';
import { SearchGoalByCriteriaQuery } from '../application/SearchByCriteria/SearchGoalByCriteriaQuery';
import { FiltersMapping } from '../utils/FiltersMapping';
import { Goal } from '../domain/Goal';


export class GoalGetByIdController implements Controller {

  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, res: Response): Promise<void> {
    const query = new SearchGoalByCriteriaQuery(FiltersMapping.idAndHidden(_req.params.id));
    const data = await this.queryBus.ask<GoalResponse>(query);
    res.status(httpStatus.OK).json(this.toResponse(data.goal));
  }

  private toResponse(goal: Goal) {
    return {
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
    }
  }
}