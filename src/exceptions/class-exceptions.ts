import {
  NotFoundError,
  BadRequestError,
} from '../shared/errors/app-errors';
import { ErrorExceptionType } from '../shared/constants/error-types';

export class ClassNotFoundException extends NotFoundError {
  constructor() {
    super('Class not found', ErrorExceptionType.CLASS_NOT_FOUND);
  }
}

export class InvalidClassIdException extends BadRequestError {
  constructor() {
    super('Class ID is invalid', ErrorExceptionType.INVALID_CLASS_ID);
  }
}

export class MissingClassIdException extends BadRequestError {
  constructor() {
    super('Class ID is invalid', ErrorExceptionType.MISSING_CLASS_ID);
  }
}
