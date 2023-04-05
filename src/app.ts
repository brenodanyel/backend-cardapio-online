import express from 'express';

import { errorHandling } from './middlewares/error-handling';
import { AuthRoutes } from './resources/auth/auth.routes';

export const app = express();
app.use(express.json());

app.use('/auth', new AuthRoutes().router);

app.use(errorHandling);
