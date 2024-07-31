import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateReflectionCommand } from '../application/CreateReflectionCommand';
import { InvalidArgumentError, Uuid, CommandBus } from '@__feedback__/shared';
import { ReflectionAlreadyExists } from '../domain/ReflectionAlreadyExists';
import { Controller } from './Controller';

export class ReflectionPostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const createDate: Date = new Date()
    const responses = req.body.responses.map((response: { userId: string; }) => ({userId: response.userId}));
    const additionalDetails : string = req.body.additionalDetails;
    const createdBy = req.currentUser?.id || '';
    const hidden = false;
    const createReflectionCommand = new CreateReflectionCommand({ id: Uuid.random().value, title, description, responses, createdBy, createDate, additionalDetails, hidden });
    try {
      await this.commandBus.dispatch(createReflectionCommand);
    } catch (error) {
      if (error instanceof ReflectionAlreadyExists) {
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
