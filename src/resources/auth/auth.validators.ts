import { body, header } from 'express-validator';

import { expressValidator } from '../../middlewares/express-validator';

export class AuthValidators {
  public verifyToken = [
    header('authorization').isString().withMessage('Authorization header must be a string'),
    expressValidator,
  ];

  public register = [
    body('username')
      .isString()
      .withMessage('Username must be a string')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters long'),
    body('password')
      .isString()
      .withMessage('Password must be a string')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    expressValidator,
  ];

  public login = [
    body('username')
      .isString()
      .withMessage('Username must be a string')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters long'),
    body('password')
      .isString()
      .withMessage('Password must be a string')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    expressValidator,
  ];
}
