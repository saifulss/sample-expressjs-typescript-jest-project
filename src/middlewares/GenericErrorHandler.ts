import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const GenericErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  if (res.headersSent) return next(err);

  console.log(err);

  res.status(err.status);
  res.json(err.message);
};
