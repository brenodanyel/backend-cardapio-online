import { ProductModel } from '../../database/models/product.model';
import { CategoryModel } from '../../database/models/category.model';
import { ConflictError, NotFoundError } from '../../utils/custom-error';

export class ProductService {
  constructor(
    private readonly productModel = ProductModel,
    private readonly categoryModel = CategoryModel
  ) {}

  public async findAll() {
    const products = await this.productModel.find().populate('categories');
    return products;
  }

  public async findById(id: string) {
    const product = await this.productModel.findById(id).populate('categories');

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  public async create(params: {
    name: string;
    qty: number;
    price: number;
    categoriesIds: string[];
  }) {
    const { name, qty, price, categoriesIds } = params;

    const productByName = await this.productModel.findOne({ name });

    if (productByName) {
      throw new ConflictError('Product with this name already exists');
    }

    const categories = await this.categoryModel.find({ _id: { $in: categoriesIds } });

    if (categoriesIds.length !== categories.length) {
      throw new NotFoundError('Some categories not found');
    }

    const product = this.productModel.create({ name, qty, price, categories });

    return product;
  }

  public async update(
    id: string,
    params: { name?: string; qty?: number; price?: number; categoriesIds?: string[] }
  ) {
    const { name, qty, price, categoriesIds } = params;

    const productByName = await this.productModel.findOne({ name, $and: [{ _id: { $ne: id } }] });

    if (productByName) {
      throw new ConflictError('Product with this name already exists');
    }

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (categoriesIds) {
      const categories = await this.categoryModel.find({ _id: { $in: categoriesIds } });

      if (categoriesIds && categoriesIds.length !== categories.length) {
        throw new NotFoundError('Some categories not found');
      }

      product.categories = categories;
    }

    if (name) product.name = name;
    if (qty) product.qty = qty;
    if (price) product.price = price;

    await product.save();

    return product;
  }

  public async delete(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundError('Category not found');
    }

    await product.deleteOne();

    return product;
  }
}
