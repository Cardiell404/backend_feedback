import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InvalidArgumentError, CommandBus } from '@__feedback__/shared';
import { ReflectionAlreadyExists } from '../domain/ReflectionAlreadyExists';
import { Controller } from './Controller';
import { SendReflectionCommand } from '../application/Send/SendReflectionCommand';

export class SendReflectionController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request & {id: string}, res: Response) {
    const id: string = req.params.id;
    const message = req.body.message;
    const userId = req.currentUser?.id || '';
    const createReflectionCommand = new SendReflectionCommand({ id, message, userId });
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
