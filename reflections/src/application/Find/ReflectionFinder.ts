import { ReflectionRepository } from "../../domain/ReflectionRepository";
import { ReflectionResponse } from "../ReflectionResponse";

export class ReflectionFinder {
  constructor(private repository: ReflectionRepository) {}

  async run() {
    const data = await this.repository.searchAll();
    return new ReflectionResponse(data);
  }
}
