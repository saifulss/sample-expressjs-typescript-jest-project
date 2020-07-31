import express, { Request, Response } from 'express';

export const RootController = express();

RootController.get('/', (req: Request, res: Response) => {
  res.send('Welcome!');
});
