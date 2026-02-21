import { ErrorExceptionType } from '../shared/constants/error-types';
import {
  BadRequestError,
  NotFoundError,
} from '../shared/errors/app-errors';

export class AssignmentNotFoundException extends NotFoundError {
  constructor() {
    super(
      'Assignment not found',
      ErrorExceptionType.ASSIGNMENT_NOT_FOUND,
    );
  }
}

export class StudentAssignmentNotFoundException extends NotFoundError {
  constructor() {
    super(
      'Assignment not found',
      ErrorExceptionType.ASSIGNMENT_NOT_FOUND,
    );
  }
}

export class InvalidAssignmentIdException extends BadRequestError {
  constructor() {
    super(
      'Assignment ID is invalid',
      ErrorExceptionType.INVALID_ASSIGNMENT_ID,
    );
  }
}

export class MissingAssignmentIdException extends BadRequestError {
  constructor() {
    super(
      'Assignment ID is invalid',
      ErrorExceptionType.MISSING_ASSIGNMENT_ID,
    );
  }
}
