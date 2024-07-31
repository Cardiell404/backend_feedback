import { Query } from "@__feedback__/shared";

type Params = {
  email: string;
  password: string;
};

export class AuthQuery extends Query {
    email: string;
    password: string;

    constructor({ email, password }: Params) {
        super();
        this.email = email;
        this.password = password;
    }
}
