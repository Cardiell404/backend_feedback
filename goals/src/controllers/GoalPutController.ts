import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UpdateGoalCommand } from '../application/Update/UpdateGoalCommand';
import { CommandBus } from '@__feedback__/shared';
import { Controller } from './Controller';
import { Status } from '../domain/value-objects/GoalStatus';

export class GoalPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {

    const id: string = req.params.id;
    const title: string = req.body.title;
    const richTextMessage: string = req.body.richTextMessage;
    const description: string = req.body.description;
    const dueDate: Date = req.body.dueDate;
    const isPrivate: boolean = req.body.isPrivate;
    const attachments: Array<string>= req.body.attachments;
    const status: Status = req.body.status;
    const modifiedBy = req.currentUser?.id || '';
    const modifieDate: Date = new Date();
    const hidden: boolean = false;
    const createGoalCommand = new UpdateGoalCommand({ id, title,richTextMessage, description, dueDate, isPrivate, attachments, status, modifiedBy, modifieDate, hidden  });
    await this.commandBus.dispatch(createGoalCommand);
    res.status(httpStatus.CREATED).send();
  }
}
