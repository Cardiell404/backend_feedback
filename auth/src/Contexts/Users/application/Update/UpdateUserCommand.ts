import { Command } from "@__feedback__/shared";

type Params = {
    id: string;
    username?: string;
    email?: string;
    password?: string;
    avatar?: string; 
    rol?: string;
    hidden?: boolean;
};

export class UpdateUserCommand extends Command {
    id: string;
    username?: string;
    email?: string;
    password?: string;
    avatar?: string; 
    rol?: string;
    hidden?: boolean;

    constructor({ id, username, email, password, avatar, rol, hidden }: Params) {
        super();
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.rol = rol;
        this.hidden = hidden
    }
}
