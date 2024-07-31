export class AuthInvalidCredentials extends Error {
  constructor() {
    super('The password is not correct');
  }
}
