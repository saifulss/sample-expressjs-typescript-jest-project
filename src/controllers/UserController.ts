import express, { Request, Response } from 'express';
import { User } from '../models/User/User';

export const UserController = express();

UserController.get('/users', (req: Request, res: Response) => {
  const user1 = new User('aaa');
  const user2 = new User('bbb');
  const user3 = new User('ccc');

  res.send([user1, user2, user3]);
});
