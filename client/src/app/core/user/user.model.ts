/* eslint-disable @typescript-eslint/naming-convention */

import { IUser } from "./user.types";

export class User implements Required<IUser> {

  id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;

  constructor(user: IUser){
    this.id = user?.id || null;
    this.name = user?.name || 'TEST';
    this.email = user.email;
    this.avatar = 'assets/images/avatars/male-01.jpg';
    this.status = user.status || null;
  }

}

