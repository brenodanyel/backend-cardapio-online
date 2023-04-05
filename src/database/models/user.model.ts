import { model, Schema, Document } from 'mongoose';

export interface User {
  username: string;
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>('User', UserSchema);
