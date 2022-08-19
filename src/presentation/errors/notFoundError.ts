export class NotFoundError extends Error {
  constructor(message?: string) {
    super('Not Found');
    this.name = message || 'NotFoundError';
  }
}
