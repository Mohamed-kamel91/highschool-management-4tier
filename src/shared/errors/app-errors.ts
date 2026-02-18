import { ErrorExceptionType } from '../constants/error-types';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errorCode: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = 'Resource not found',
    errorCode: string = 'NOT_FOUND',
  ) {
    super(message, 404, errorCode);
  }
}

export class BadRequestError extends AppError {
  constructor(
    message: string = 'Bad request',
    errorCode: string = 'BAD_REQUEST',
  ) {
    super(message, 400, errorCode);
  }
}

export class InternalServerError extends AppError {
  constructor(
    message: string = 'Something went wrong on our end',
    errorCode: string = 'INTERNAL_SERVER_ERROR',
  ) {
    super(message, 500, errorCode);
  }
}

export class MissingRequestBodyException extends BadRequestError {
  constructor() {
    super('Request body is missing', ErrorExceptionType.CLIENT_ERROR);
  }
}

export class InvalidRequestBodyException extends BadRequestError {
  constructor(missingKeys: string[]) {
    super(
      'Body is missing required key: ' + missingKeys.join(', '),
      ErrorExceptionType.VALIDATION_ERROR,
    );
  }
}
