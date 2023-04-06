import { model, Schema, Document } from 'mongoose';

export type Category = {
  parent: Category | null;
  name: string;
};

export type CategoryDocument = Category & Document;

export const CategorySchema = new Schema<Category>({
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: { type: String, required: true },
});

export const CategoryModel = model<Category>('Category', CategorySchema);
