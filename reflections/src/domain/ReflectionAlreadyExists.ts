export class ReflectionAlreadyExists extends Error {
  constructor(id: string) {
    super(`Reflection ${id} already exists`);
  }
}
