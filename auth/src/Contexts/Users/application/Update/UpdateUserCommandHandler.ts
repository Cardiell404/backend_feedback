import { Command, CommandHandler, UserId, UserAvatar } from "@__feedback__/shared";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { UserName } from "../../../Shared/domain/UserName";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { UpdateUserCommand } from "./UpdateUserCommand";
import { UserUpdater } from "./UserUpdater";
import { UserRol } from "../../domain/value-objects/UserRol";


export class UpdateUserCommandHandler implements CommandHandler<UpdateUserCommand> {
    constructor(private userUpdater: UserUpdater) {}

    subscribedTo(): Command {
        return UpdateUserCommand;
    }

    async handle(command: UpdateUserCommand): Promise<void> {
        const id = new UserId(command.id);
        const username = command.username ? new UserName(command.username) : undefined;
        const password = command.password ? new UserPassword(command.password) : undefined;
        const email = command.email ? new UserEmail(command.email) : undefined;
        const avatar = command.avatar ? new UserAvatar(command.avatar) : undefined;
        const rol = command.rol ? new UserRol(command.rol) : undefined;
        const hidden = command.hidden;

        await this.userUpdater.run({ id, username, password, email, avatar, rol, hidden });
    }
}
