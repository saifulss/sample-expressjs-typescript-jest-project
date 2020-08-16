import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { JwtService } from '../services/JwtService/JwtService';

export const JwtVerificationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const guestRoutes: string[] = [
    '/signup',
    '/login'
  ];

  if (guestRoutes.includes(req.path)) {
    return next();
  }

  const authHeader = req.header('Authorization');
  if (!authHeader) return next(new createHttpError.Unauthorized('No authorization header supplied.'));
  const token = authHeader.replace('Bearer ', '');
  if (!token) return next(new createHttpError.Unauthorized('No token supplied.'));

  const jwtService = new JwtService(
    process.env.JWT_RSA_PRIVATE_KEY,
    process.env.JWT_RSA_PUBLIC_KEY
  );
  const tokenPayload = jwtService.verifyToken(token);

  if (!tokenPayload) return next(new createHttpError.Unauthorized('Invalid token.'));

  res.locals.user = {
    id: tokenPayload.id,
    displayName: tokenPayload.displayName,
    email: tokenPayload.email
  };

  console.log('Token verified successfully:', tokenPayload);

  return next();
};
