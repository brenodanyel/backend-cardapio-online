import { CategoryModel } from '../../database/models/category.model';
import { ConflictError, NotFoundError } from '../../utils/custom-error';

export class CategoryService {
  constructor(private readonly categoryModel = CategoryModel) {}

  public async findAll() {
    const categories = await this.categoryModel
      .find(
        {},
        {
          __v: false,
        }
      )
      .populate('parent');
    return categories;
  }

  public async create(params: { name: string; parentId?: string | null }) {
    const { name, parentId } = params;

    const categoryByName = await this.categoryModel.findOne({ name });

    if (categoryByName) {
      throw new ConflictError('Category with this name already exists');
    }

    let parent = null;

    if (parentId) {
      parent = await this.categoryModel.findById(parentId);

      if (!parent) {
        throw new NotFoundError('Parent category not found');
      }
    }

    const category = this.categoryModel.create({ name, parent });

    return category;
  }

  public async update(id: string, params: { name: string; parentId?: string | null }) {
    const { name, parentId } = params;

    const categoryByName = await this.categoryModel.findOne({ name, $and: [{ _id: { $ne: id } }] });

    if (categoryByName) {
      throw new ConflictError('Category with this name already exists');
    }

    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    if (parentId) {
      const parent = await this.categoryModel.findById(parentId);

      if (!parent) {
        throw new NotFoundError('Parent category not found');
      }

      category.parent = parent;
    }

    if (parentId === null) {
      category.parent = null;
    }

    category.name = name;

    await category.save();

    return category;
  }

  public async delete(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    await category.deleteOne();

    return category;
  }
}
