export class BadRequestError extends Error {
  constructor(message?: string) {
    super('Bad Request');

    this.name = 'BadRequest';
    this.message = message || 'Bad Request';
  }
}
