import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateGoalCommand } from '../application/Create/CreateGoalCommand';
import { CommandBus, Uuid } from '@__feedback__/shared';
import { Controller } from './Controller';
import { Status } from '../domain/value-objects/GoalStatus';

export class GoalPostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request & {id: string}, res: Response) {
    const id: string = Uuid.random().value;
    const title: string = req.body.title;
    const richTextMessage: string = req.body.richTextMessage;
    const description: string = req.body.description;
    const dueDate: Date = req.body.dueDate;
    const isPrivate: boolean = req.body.isPrivate;
    const attachments: Array<string>= req.body.attachments;
    const status = Status.OPENED;
    const createdBy = req.currentUser?.id || '';
    const createdDate: Date = new Date();
    const hidden: boolean = false;
    const createGoalCommand = new CreateGoalCommand({ id, title, richTextMessage, description, dueDate, isPrivate, attachments, status, createdBy, createdDate, hidden });
    await this.commandBus.dispatch(createGoalCommand);
    res.status(httpStatus.CREATED).send({id});
  }
}
