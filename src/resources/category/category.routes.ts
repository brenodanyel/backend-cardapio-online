import { Router } from 'express';
import { CategoryController } from './category.controller';
import { CategoryValidators } from './category.validators';

export class CategoryRoutes {
  public router: Router = Router();

  constructor(
    private validator = new CategoryValidators(),
    private controller = new CategoryController()
  ) {
    this.router
      .route('/')
      .get(this.controller.findAll)
      .post(this.validator.create, this.controller.create);
  }
}
