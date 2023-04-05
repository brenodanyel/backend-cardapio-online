import { RequestHandler } from 'express';

import { CategoryService } from './category.service';

export class CategoryController {
  constructor(private categoryService = new CategoryService()) {}

  public findAll: RequestHandler = async (_req, res, next) => {
    try {
      const categories = await this.categoryService.findAll();
      res.status(200).json(categories);
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

  public update: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, parentId } = req.body;
      const category = await this.categoryService.update(id, { name, parentId });
      res.status(200).json({ category });
    } catch (e) {
      next(e);
    }
  };

  public delete: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.categoryService.delete(id);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  };
}
