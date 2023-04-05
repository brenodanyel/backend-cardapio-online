import { ErrorRequestHandler } from 'express';
import { HttpError } from '../utils/custom-error';

export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.code).json({ error: err.message });
    return;
  }

  console.error(err);

  res.status(500).json({ error: 'Internal server error' });
};
