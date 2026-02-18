import {
  NotFoundError,
  BadRequestError,
} from '../shared/errors/app-errors';
import { ErrorExceptionType } from '../shared/constants/error-types';

export class StudentNotFoundException extends NotFoundError {
  constructor() {
    super('Student not found', ErrorExceptionType.STUDENT_NOT_FOUND);
  }
}

export class InvalidStudentIdException extends BadRequestError {
  constructor() {
    super(
      'Student ID is invalid',
      ErrorExceptionType.INVALID_STUDENT_ID,
    );
  }
}
