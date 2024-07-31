import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { FeedbackAlreadyExists } from '../../domain/FeedbackAlreadyExists';
import { CommandBus, InvalidArgumentError } from '@__feedback__/shared';
import { Controller } from '../Controller';
import { SendFeedbackCommand } from '../../application/Send/SendFeedbackCommand';

export class SendFeedbackController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request & {id: string}, res: Response) {
    const id: string = req.params.id;
    const message = req.body.message;
    const userId = req.currentUser?.id || '';
    const createFeedbackCommand = new SendFeedbackCommand({ id, message, userId });
    try {
      await this.commandBus.dispatch(createFeedbackCommand);
    } catch (error) {
      if (error instanceof FeedbackAlreadyExists) {
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
