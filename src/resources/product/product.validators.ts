import { body, header, param } from 'express-validator';
import { Types } from 'mongoose';

import { expressValidator } from '../../middlewares/express-validator';

export class ProductValidators {
  public findAll = [
    header('authorization').isString().withMessage('Authorization header must be a string'),
    expressValidator,
  ];

  public findById = [
    param('id').isMongoId().withMessage('Id must be a valid Mongo ID'),
    header('authorization').isString().withMessage('Authorization header must be a string'),
    expressValidator,
  ];

  public create = [
    header('authorization').isString().withMessage('Authorization header must be a string'),
    body('name')
      .isString()
      .withMessage('Name must be a string')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters long'),
    body('qty').isNumeric().withMessage('Qty must be a number'),
    body('price').isNumeric().withMessage('Qty must be a number'),
    body('categoriesIds')
      .isArray()
      .withMessage('categoriesIds must be an array')
      .custom((value: string[]) => value.every((item) => Types.ObjectId.isValid(item)))
      .withMessage('categoriesIds must be an array of valid Mongo IDs'),
    expressValidator,
  ];

  public update = [
    param('id').isMongoId().withMessage('Id must be a valid Mongo ID'),
    header('authorization').isString().withMessage('Authorization header must be a string'),
    body('name')
      .optional()
      .isString()
      .withMessage('Name must be a string')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters long'),
    body('qty').optional().isNumeric().withMessage('Qty must be a number'),
    body('price').optional().isNumeric().withMessage('Qty must be a number'),
    body('categoriesIds')
      .optional()
      .isArray()
      .withMessage('categoriesIds must be an array')
      .custom((value: string[]) => value.every((item) => Types.ObjectId.isValid(item)))
      .withMessage('categoriesIds must be an array of valid Mongo IDs'),
    expressValidator,
  ];

  public delete = [
    param('id').isMongoId().withMessage('Id must be a valid Mongo ID'),
    header('authorization').isString().withMessage('Authorization header must be a string'),
    expressValidator,
  ];
}
