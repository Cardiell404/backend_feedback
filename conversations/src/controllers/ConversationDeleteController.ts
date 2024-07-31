import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UpdateConversationCommand } from '../application/Update/UpdateConversationCommand';
import { ConversationAlreadyExists } from '../domain/ConversationAlreadyExists';
import { CommandBus, InvalidArgumentError } from '@__feedback__/shared';
import { Controller } from './Controller';

export class ConversationDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const updateConversationCommand = new UpdateConversationCommand({ id, hidden: true });
    try {
      await this.commandBus.dispatch(updateConversationCommand);
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
