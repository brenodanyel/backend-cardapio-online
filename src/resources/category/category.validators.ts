import { body, header } from 'express-validator';
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
    body('parentId').optional().isMongoId().withMessage('ParentId must be a valid Mongo ID'),
    expressValidator,
  ];
}
