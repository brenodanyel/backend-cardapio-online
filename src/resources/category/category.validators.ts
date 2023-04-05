import { body, header, param } from 'express-validator';

import { expressValidator } from '../../middlewares/express-validator';

export class CategoryValidators {
  public create = [
    header('authorization').isString().withMessage('Authorization header must be a string'),
    body('name')
      .isString()
      .withMessage('Name must be a string')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters long'),
    body('parentId')
      .optional({ nullable: true })
      .isMongoId()
      .withMessage('ParentId must be a valid Mongo ID'),
    expressValidator,
  ];

  public update = [
    param('id').isMongoId().withMessage('Id must be a valid Mongo ID'),
    header('authorization').isString().withMessage('Authorization header must be a string'),
    body('name')
      .isString()
      .withMessage('Name must be a string')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters long'),
    body('parentId')
      .optional({ nullable: true })
      .isMongoId()
      .withMessage('ParentId must be a valid Mongo ID'),
    expressValidator,
  ];

  public delete = [
    param('id').isMongoId().withMessage('Id must be a valid Mongo ID'),
    header('authorization').isString().withMessage('Authorization header must be a string'),
    expressValidator,
  ];
}
