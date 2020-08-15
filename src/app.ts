import { config } from 'dotenv';
import express, { Application } from 'express';
import { RootController } from './controllers/RootController';
import { RequestHeaderLoggerMiddleware } from './middlewares/RequestHeadersLoggerMiddleware';
import { UserController } from './controllers/UserController';
import bodyParser from 'body-parser';
import { GenericErrorHandler } from './middlewares/GenericErrorHandler';
import { LoginController } from './controllers/LoginController';
import { JwtVerificationMiddleware } from './middlewares/JwtVerificationMiddleware';

config();

const app: Application = express();

// middleware
app.use(bodyParser.json());
app.use(RequestHeaderLoggerMiddleware);
app.use(JwtVerificationMiddleware);

// controllers (and their routes)
app.use(RootController);
app.use(LoginController);
app.use(UserController);

app.use(GenericErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express is listening on port ${port}...`);
});
