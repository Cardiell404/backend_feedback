import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InvalidArgumentError, CommandBus } from '@__feedback__/shared';
import { ReflectionAlreadyExists } from '../domain/ReflectionAlreadyExists';
import { Controller } from './Controller';
import { UpdateReflectionCommand } from '../application/Update/UpdateReflectionCommand';

export class ReflectionPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const title: string = req.body.title;
    const description: string = req.body.description;
    const additionalDetails : string = req.body.additionalDetails;
    const updateReflectionCommand = new UpdateReflectionCommand({ id, title, description, additionalDetails });
    try {
      await this.commandBus.dispatch(updateReflectionCommand);
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
