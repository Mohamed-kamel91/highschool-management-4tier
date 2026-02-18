import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

import { AppError, InternalServerError } from './app-errors';

export type ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.errorCode,
      data: undefined,
      message: err.message,
      success: false,
    });
  }

  console.error('--- UNEXPECTED ERROR ---');
  console.error(err);

  const serverError = new InternalServerError();

  return res.status(serverError.statusCode).json({
    error: serverError.errorCode,
    data: undefined,
    message: serverError.message,
    success: false,
  });
};
