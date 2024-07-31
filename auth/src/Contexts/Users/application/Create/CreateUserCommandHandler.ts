import { CreateUserCommand } from './CreateUserCommand';
import { UserCreator } from './UserCreator';
import { UserName } from '../../../Shared/domain/UserName';
import { UserPassword } from '../../domain/value-objects/UserPassword';
import { UserEmail } from '../../domain/value-objects/UserEmail';
import { Command, CommandHandler, UserAvatar, UserId } from '@__feedback__/shared';
import { UserRol } from '../../domain/value-objects/UserRol';

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
    constructor(private userCreator: UserCreator) {}

    subscribedTo(): Command {
        return CreateUserCommand;
    }

    async handle(command: CreateUserCommand): Promise<void> {
        const id = new UserId(command.id);
        const username = new UserName(command.username);
        const password = new UserPassword(command.password);
        const email = new UserEmail(command.email);
        const avatar = command.avatar ? new UserAvatar(command.avatar) : undefined;
        const rol = new UserRol(command.rol);
        const hidden = command.hidden;
        const createdBy = new UserId(command.createdBy);
        const createDate = command.createDate;

        await this.userCreator.run({ id, username, password, email, avatar, rol, hidden, createdBy, createDate });
    }
}
