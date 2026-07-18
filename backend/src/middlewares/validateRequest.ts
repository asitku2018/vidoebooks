import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse request data against the provided Zod schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      // If validation succeeds, move to the next middleware/controller
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Map Zod errors into a clean, readable array for the client
        const errors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        
        // Pass the mapped errors to the global error handler
        next(new AppError('Validation failed', 400, errors));
      } else {
        // Pass unexpected errors down the chain
        next(error);
      }
    }
  };
};
