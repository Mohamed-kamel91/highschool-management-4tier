import { NotFoundError, BadRequestError } from './app-errors';

export class StudentNotFoundError extends NotFoundError {
  constructor() {
    super('Student not found');
  }
}

export class InvalidStudentIdError extends BadRequestError {
  constructor() {
    super('Invalid student Id');
  }
}
