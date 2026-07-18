import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors = undefined;

  // Check if the error is a known operational error
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else {
    // Log unexpected errors for internal debugging
    console.error('UNEXPECTED ERROR: ', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    // Only leak stack traces in development mode
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
