export class FkError extends Error {
  constructor(message?: string) {
    super('Foreign Key Constraint Violation');
    this.name = 'ForeignKeyError';

    this.message = message || 'Foreign Key Constraint Violation';
  }
}
