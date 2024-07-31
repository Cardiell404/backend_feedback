import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CommandBus } from '@__feedback__/shared';
import { Controller } from '../Controller';
import { UpdateUserCommand } from '../../Contexts/Users/application/Update/UpdateUserCommand';

export class UserPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const username: string = req.body.username;
    const hidden: boolean = false;
    const avatar: string = req.body.avatar;

    const updateUserCommand = new UpdateUserCommand({ id, username, hidden, avatar });
    await this.commandBus.dispatch(updateUserCommand);
    res.status(httpStatus.CREATED).send();
  }
}
