import { RequestHandler } from 'express';

import { ProductService } from './product.service';

export class ProductController {
  constructor(private productService = new ProductService()) {}

  public findAll: RequestHandler = async (_req, res, next) => {
    try {
      const products = await this.productService.findAll();
      res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  };

  public findById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.productService.findById(id);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  public create: RequestHandler = async (req, res, next) => {
    try {
      const { name, qty, price, categoriesIds } = req.body;
      const product = await this.productService.create({ name, qty, price, categoriesIds });
      res.status(201).json({ category: product });
    } catch (e) {
      next(e);
    }
  };

  public update: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, qty, price, categoriesIds } = req.body;
      const product = await this.productService.update(id, { name, qty, price, categoriesIds });
      res.status(200).json({ product });
    } catch (e) {
      next(e);
    }
  };

  public delete: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.productService.delete(id);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  };
}
