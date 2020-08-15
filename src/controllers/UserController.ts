import express, { Request, Response } from 'express';
import { DatabaseConnection } from '../DatabaseConnection';
import { User } from '../entities/User';
import { IUser } from '../types/types';

export const UserController = express();

UserController.get('/users', async (req: Request, res: Response) => {
  const connection = await DatabaseConnection.getInstance();

  const users = await connection
    .getRepository(User)
    .find();

  res.send(users.map((user: User): IUser => ({
    id: user.id,
    displayName: user.displayName,
    email: user.email
  })));
});
