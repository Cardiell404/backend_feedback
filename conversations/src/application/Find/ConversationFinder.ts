import { ConversationRepository } from "../../domain/ConversationRepository";
import { ConversationResponse } from "../ConversationResponse";

export class ConversationFinder {
  constructor(private repository: ConversationRepository) {}

  async run() {
    const data = await this.repository.searchAll();
    return new ConversationResponse(data);
  }
}
