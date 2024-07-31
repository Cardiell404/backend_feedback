import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CommandBus, Uuid, InvalidArgumentError } from '@__feedback__/shared';
import { Controller } from '../Controller';
import { CreateFeedbackCommand } from '../../application/CreateFeedbackCommand';
import { FeedbackAlreadyExists } from '../../domain/FeedbackAlreadyExists';

export class FeedbackPostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request & {id: string}, res: Response) {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const createDate: Date = new Date()
    const responses = req.body.responses.map((response: { userId: string; }) => ({userId: response.userId}));
    const additionalDetails : string = req.body.additionalDetails;
    const createdBy = req.currentUser?.id || '';
    const hidden = false;
    console.log({ id: Uuid.random().value, title, description, responses, createdBy, createDate, additionalDetails, hidden });
    const createFeedbackCommand = new CreateFeedbackCommand({ id: Uuid.random().value, title, description, responses, createdBy, createDate, additionalDetails, hidden });
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
