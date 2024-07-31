export class ConversationAlreadyExists extends Error {
  constructor(id: string) {
    super(`Conversation ${id} already exists`);
  }
}
