import { Category, CategoryModel } from '../models/category.model';

type SeedCategory = Category & {
  children: { name: string }[];
};

export default async function seedCategory() {
  const categories: SeedCategory[] = [
    {
      name: 'Bebidas',
      parent: null,
      children: [
        { name: 'Refrigerantes' },
        { name: 'Sucos naturais' },
        { name: 'Água' },
        { name: 'Chás' },
        { name: 'Café' },
      ],
    },
    {
      name: 'Lanches',
      parent: null,
      children: [{ name: 'Salgadinhos' }, { name: 'Bolachas' }, { name: 'Sanduíches' }],
    },
    {
      name: 'Café da manhã',
      parent: null,
      children: [{ name: 'Pães' }, { name: 'Cereais' }, { name: 'Frutas' }],
    },
  ];

  // await CategoryModel.deleteMany();

  for (const category of categories) {
    let dbCategory = await CategoryModel.findOne({ name: category.name });

    if (!dbCategory) {
      dbCategory = await CategoryModel.create({ name: category.name });
      await dbCategory.save();
    }

    if (category.children) {
      for (const child of category.children) {
        let dbChild = await CategoryModel.findOne({ name: child.name });

        if (!dbChild) {
          dbChild = await CategoryModel.create({ name: child.name, parent: dbCategory._id });
          await dbChild.save();
        }
      }
    }
  }
}
