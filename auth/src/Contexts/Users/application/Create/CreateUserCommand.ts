import { Command } from "@__feedback__/shared";

type Params = {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar?: string; 
    rol: string;
    hidden: boolean;
    createdBy: string;
    createDate: Date;
};

export class CreateUserCommand extends Command {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar?: string; 
    rol: string;
    hidden: boolean;
    createdBy: string;
    createDate: Date;

    constructor({ id, username, email, password, avatar, rol, hidden, createdBy, createDate }: Params) {
        super();
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.rol = rol;
        this.hidden = hidden;
        this.createdBy = createdBy;
        this.createDate = createDate;
    }
}
