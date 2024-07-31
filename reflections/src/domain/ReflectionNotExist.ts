export class ReflectionNotExist extends Error {
  constructor() {
    super('The reflection does not exists');
  }
}
