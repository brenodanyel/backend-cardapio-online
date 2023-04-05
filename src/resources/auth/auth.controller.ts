import { RequestHandler } from 'express';

import { AuthService } from './auth.service';

export class AuthController {
  constructor(private authService: AuthService = new AuthService()) {}

  public register: RequestHandler = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const token = await this.authService.register(username, password);
      res.status(201).json({ user: token });
    } catch (e) {
      next(e);
    }
  };

  public login: RequestHandler = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const token = await this.authService.login(username, password);
      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  };

  public verifyToken: RequestHandler = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const user = await this.authService.verifyToken(String(authorization));
      res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  };
}
