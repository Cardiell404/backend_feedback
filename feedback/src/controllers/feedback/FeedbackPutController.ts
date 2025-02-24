import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { FeedbackAlreadyExists } from '../../domain/FeedbackAlreadyExists';
import { CommandBus, InvalidArgumentError } from '@__feedback__/shared';
import { Controller } from '../Controller';
import { UpdateFeedbackCommand } from '../../application/Update/UpdateFeedbackCommand';

export class FeedbackPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const title: string = req.body.title;
    const description: string = req.body.description;
    const additionalDetails : string = req.body.additionalDetails;
    const updateFeedbackCommand = new UpdateFeedbackCommand({ id, title, description, additionalDetails });
    try {
      await this.commandBus.dispatch(updateFeedbackCommand);
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
