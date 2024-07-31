import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UpdateConversationCommand } from '../application/Update/UpdateConversationCommand';
import { ConversationAlreadyExists } from '../domain/ConversationAlreadyExists';
import { CommandBus, InvalidArgumentError } from '@__feedback__/shared';
import { Controller } from './Controller';

export class ConversationPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const title: string = req.body.title;
    const description: string = req.body.description;
    const additionalDetails : string = req.body.additionalDetails;
    const updateConversationCommand = new UpdateConversationCommand({ id, title, description, additionalDetails });
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
