export class ConversationNotExist extends Error {
  constructor() {
    super('The conversation does not exists');
  }
}
