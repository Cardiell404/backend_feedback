import { Reflection } from "../domain/Reflection";

export class ReflectionResponse {
  readonly reflection: Array<Reflection>;

  constructor(reflection: Array<Reflection>) {
    this.reflection = reflection;
  }
}
