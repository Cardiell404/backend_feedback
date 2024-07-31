import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UpdateGoalCommand } from '../application/Update/UpdateGoalCommand';
import { CommandBus } from '@__feedback__/shared';
import { Controller } from './Controller';

export class GoalDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id
    const createGoalCommand = new UpdateGoalCommand({ id, hidden: true });
    await this.commandBus.dispatch(createGoalCommand);
    res.status(httpStatus.CREATED).send();
  }
}
