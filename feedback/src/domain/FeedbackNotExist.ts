export class FeedbackNotExist extends Error {
  constructor() {
    super('The fededback does not exists');
  }
}
