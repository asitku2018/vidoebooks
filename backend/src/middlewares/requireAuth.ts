import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

// Extend the Express Request interface to include our custom user payload
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Extract token securely from HTTP-only cookies
    const token = req.cookies.token;

    if (!token) {
      throw new AppError('Authentication required. Please log in.', 401);
    }

    // Verify token and extract payload
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
    
    // Attach user to the request context
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Your session has expired. Please log in again.', 401));
    } else {
      next(new AppError('Invalid token. Authentication failed.', 401));
    }
  }
};
