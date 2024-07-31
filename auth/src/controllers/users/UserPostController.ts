import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CommandBus, CryptoImplement, Uuid } from '@__feedback__/shared';
import { Controller } from '../Controller';
import { CreateUserCommand } from '../../Contexts/Users/application/Create/CreateUserCommand';

export class UserPostController implements Controller {
  constructor(private commandBus: CommandBus, private crypto: CryptoImplement) {}

  async run(req: Request, res: Response) {
    const id: string =  Uuid.random().value;
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = this.crypto.encryptPassword(req.body.password);
    const rol: string = req.body.rol;
    const hidden: boolean = false;
    const createdBy: string = req.currentUser?.id || id;
    const createDate: Date = new Date();
    const avatar: string = req.body.avatar;

    const createFeedbackCommand = new CreateUserCommand({ id, email, password, username, rol, hidden, createDate, createdBy, avatar });
    await this.commandBus.dispatch(createFeedbackCommand);
    res.status(httpStatus.CREATED).send({id});
  }
}
