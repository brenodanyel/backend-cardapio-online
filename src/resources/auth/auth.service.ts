import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { BadRequestError, ConflictError, NotFoundError } from '../../utils/custom-error';
import { UserModel, UserDocument } from '../../database/models/user.model';

const { JWT_SECRET = 'ultra_secret_key' } = process.env;

export class AuthService {
  constructor(private readonly userModel = UserModel) {}

  private generateToken(user: UserDocument) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return token;
  }

  public async register(username: string, rawPassword: string) {
    const foundUser = await this.userModel.findOne({ username });

    if (foundUser) {
      throw new ConflictError('There is already a user with this username');
    }

    const password = await bcrypt.hash(rawPassword, 10);

    const user = await this.userModel.create({ username, password });

    return this.generateToken(user);
  }

  public async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundError('Username or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundError('Username or password is incorrect');
    }

    return this.generateToken(user);
  }

  public verifyToken(rawToken: string) {
    try {
      const [, token] = rawToken.split(' ');
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

      const user = this.userModel.findById(decoded.id, {
        password: false,
      });

      return user;
    } catch (error) {
      throw new BadRequestError('Invalid token');
    }
  }
}
