import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateConversationCommand } from '../application/CreateConversationCommand';
import { InvalidArgumentError, Uuid, CommandBus } from '@__feedback__/shared';
import { ConversationAlreadyExists } from '../domain/ConversationAlreadyExists';
import { Controller } from './Controller';

export class ConversationPostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request & {id: string}, res: Response) {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const additionalDetails : string = req.body.additionalDetails;
    const createdBy = req.currentUser?.id || '';
    const whoCanSee = req.body.users;
    const createDate: Date = new Date()
    const hidden = false;
    const createConversationCommand = new CreateConversationCommand({ id: Uuid.random().value, title, description, createdBy, whoCanSee, createDate, additionalDetails, hidden });
    try {
      await this.commandBus.dispatch(createConversationCommand);
    } catch (error) {
      if (error instanceof ConversationAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else if(error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).send(error.message)
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }

    res.status(httpStatus.CREATED).send();
  }
}
