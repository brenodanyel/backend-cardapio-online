import { User, UserModel } from '../models/user.model';
import { hash } from 'bcryptjs';

export default async function seedProducts() {
  const users: User[] = [
    {
      username: 'admin',
      password: await hash('my_password_here', 10),
    },
  ];

  await UserModel.deleteMany();

  for (const user of users) {
    let dbUser = await UserModel.findOne({ username: user.username });
    if (!dbUser) {
      dbUser = await UserModel.create(user);
      await dbUser.save();
    }
  }

  console.log(await UserModel.find({}));
}
