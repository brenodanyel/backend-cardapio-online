import { Router } from 'express';

import { ProductController } from './product.controller';
import { ProductValidators } from './product.validators';

export class ProductRoutes {
  public router: Router = Router();

  constructor(
    private validator = new ProductValidators(),
    private controller = new ProductController()
  ) {
    this.router
      .route('/')
      .get(this.validator.findAll, this.controller.findAll)
      .post(this.validator.create, this.controller.create);

    this.router
      .route('/:id')
      .get(this.validator.findById, this.controller.findById)
      .patch(this.validator.update, this.controller.update)
      .delete(this.validator.delete, this.controller.delete);
  }
}
