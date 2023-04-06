import { Product, ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';

export default async function seedProducts() {
  const products: Product[] = [
    {
      name: 'Coca-cola',
      categories: [
        { name: 'Bebidas', parent: null },
        { name: 'Refrigerantes', parent: null },
      ],
      qty: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100),
    },
    {
      name: 'Suco de laranja',
      categories: [
        { name: 'Bebidas', parent: null },
        { name: 'Sucos naturais', parent: null },
      ],
      qty: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100),
    },
    {
      name: 'Água mineral',
      categories: [
        { name: 'Bebidas', parent: null },
        { name: 'Água', parent: null },
      ],
      qty: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100),
    },
    {
      name: 'Chá de camomila',
      categories: [
        { name: 'Bebidas', parent: null },
        { name: 'Chás', parent: null },
      ],
      qty: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 100),
    },
  ];

  // await ProductModel.deleteMany();

  for (const product of products) {
    let categories = [];

    for (const category of product.categories) {
      const dbCategory = await CategoryModel.findOne({ name: category.name });

      if (dbCategory) {
        categories.push(dbCategory._id);
      }
    }

    let dbProduct = await ProductModel.findOne({ name: product.name });

    if (!dbProduct) {
      dbProduct = await ProductModel.create({
        name: product.name,
        qty: product.qty,
        price: product.price,
        categories,
      });

      await dbProduct.save();
    }
  }
}
