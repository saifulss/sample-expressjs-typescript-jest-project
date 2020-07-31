import { config } from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { RootController } from './controllers/RootController';
import { RequestHeaderLoggerMiddleware } from './middlewares/RequestHeadersLoggerMiddleware';
import { UserController } from './controllers/UserController';

config();

const app: Application = express();

// middleware
app.use(RequestHeaderLoggerMiddleware);

// controllers (and their routes)
app.use(RootController);
app.use(UserController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express is listening on port ${port}...`);
});
