import { RequestHandler } from 'express';

import { CategoryService } from './category.service';

export class CategoryController {
  constructor(private categoryService = new CategoryService()) {}

  public findAll: RequestHandler = async (req, res, next) => {
    try {
      const categories = await this.categoryService.findAll();
      res.status(200).json({ categories });
    } catch (e) {
      next(e);
    }
  };

  public create: RequestHandler = async (req, res, next) => {
    try {
      const { name, parentId } = req.body;
      const category = await this.categoryService.create({ name, parentId });
      res.status(201).json({ category });
    } catch (e) {
      next(e);
    }
  };
}
