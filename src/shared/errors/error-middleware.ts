import { Request, Response, NextFunction } from 'express';
import { AppError } from './app-errors';

export function errorMiddlewareHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      data: undefined,
      error: err.message,
      success: false,
    });
  }

  res.status(500).json({
    data: undefined,
    error: 'Internal server error',
    success: false,
  });
}
