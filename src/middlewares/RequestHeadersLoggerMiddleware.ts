import { NextFunction, Request, RequestHandler, Response } from 'express';

export const RequestHeaderLoggerMiddleware: RequestHandler =
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers);
    next();
  };
