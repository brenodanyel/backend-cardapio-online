import { model, Schema, Document } from 'mongoose';
import { Category } from './category.model';

interface Product {
  categories: Category[];
  name: string;
  qty: number;
  price: number;
}

type ProductDocument = Product & Document;

const ProductSchema = new Schema<ProductDocument>({
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const ProductModel = model<ProductDocument>('Product', ProductSchema);
