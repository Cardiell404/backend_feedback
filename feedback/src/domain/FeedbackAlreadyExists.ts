export class FeedbackAlreadyExists extends Error {
  constructor(id: string) {
    super(`Feedback ${id} already exists`);
  }
}
