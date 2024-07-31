import { JwtImplement } from '@__feedback__/shared';
import { AuthLoginResponse } from './AuthLoginResponse';
import { AuthRepository } from '../../domain/AuthRepository';
import { AuthNotExist } from '../../domain/errors/AuthNotExist';
import { AuthInvalidCredentials } from '../../domain/errors/AuthInvalidCredentials';

export class AuthLogin {
  private repository: AuthRepository;
  private jwt: JwtImplement;

  constructor(repository: AuthRepository, jwt: JwtImplement) {
    this.repository = repository;
    this.jwt = jwt;
  }

  async run( email: string, password: string): Promise<AuthLoginResponse> {
    const data = await this.repository.login(email);
    if (!data) {
      throw new AuthNotExist();
    }
    if(!this.compareSync(password, data.password.toString())) {
      throw new AuthInvalidCredentials();
    }
    const token = this.jwt.createToken({id: data.id.value, email: data.email.value});
    return new AuthLoginResponse({user: {id: data.id.value}, token});
  }

  compareSync(data: string, encrypted: string): boolean {
    return data == encrypted;
  }
}
