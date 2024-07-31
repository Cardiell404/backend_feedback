import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SendConversationCommand } from '../application/Send/SendConversationCommand';
import { ConversationAlreadyExists } from '../domain/ConversationAlreadyExists';
import { CommandBus, InvalidArgumentError, Uuid } from '@__feedback__/shared';
import { Controller } from './Controller';

export class SendConversationController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request & {id: string}, res: Response) {
    const conversationId: string = req.params.id;
    const text = req.body.message;
    const commentBy = req.currentUser?.id || '';
    const datePublished = new Date();

    const createConversationCommand = new SendConversationCommand({ id: Uuid.random().value, conversationId, text, commentBy, datePublished });
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
