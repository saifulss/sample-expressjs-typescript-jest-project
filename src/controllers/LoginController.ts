import express, { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { UserService } from '../services/UserService';
import { JwtService } from '../services/JwtService';

export const LoginController = express();

LoginController.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = await req.body;

    const userService = new UserService();

    const foundUser = await userService.getUserByEmailAndPassword(email, password);

    if (!foundUser) return next(new createHttpError.Unauthorized('Invalid login credentials.'));

    const jwtService = new JwtService(
      process.env.JWT_RSA_PRIVATE_KEY,
      process.env.JWT_RSA_PUBLIC_KEY
    );
    const token = jwtService.makeToken(foundUser);

    res.json({
      ...foundUser,
      token
    });
  }
);

LoginController.post(
  '/signup',
  async (req: Request, res: Response, next: NextFunction) => {
    const { displayName, email, password } = await req.body;

    const userService = new UserService();

    if (await userService.doesUserExist(email))
      return next(new createHttpError.Unauthorized('User already exists.'));

    const savedUser = await userService.createNewUser({
      displayName,
      email,
      password
    });

    res.status(201);
    res.json({
      id: savedUser.id,
      displayName,
      email
    });
  }
);
