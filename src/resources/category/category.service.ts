import { CategoryModel } from '../../database/models/category.model';
import { ConflictError, NotFoundError } from '../../utils/custom-error';

export class CategoryService {
  constructor(private readonly categoryModel = CategoryModel) {}

  public async findAll() {
    const categories = await this.categoryModel.find().populate('parent');
    return categories;
  }

  public async create(params: { name: string; parentId?: string }) {
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
}
