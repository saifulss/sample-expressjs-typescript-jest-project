import { NextFunction, Request, Response } from 'express';

export const RequestHeaderLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
  next();
};
