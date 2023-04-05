import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthValidators } from './auth.validators';

export class AuthRoutes {
  public router: Router = Router();

  constructor(private validator = new AuthValidators(), private controller = new AuthController()) {
    this.router.route('/register').post(this.validator.register, this.controller.register);
    this.router.route('/login').post(this.validator.login, this.controller.login);
  }
}
