import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const categories = dbHelpers.getAllCategories();
        res.status(200).json(categories);
      } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: '获取分类列表失败' });
      }
      break;

    case 'POST':
      try {
        const { name, slug, description, image, sort_order } = req.body;

        if (!name || !slug) {
          return res.status(400).json({ error: '分类名称和别名不能为空' });
        }

        const id = dbHelpers.createCategory({
          name,
          slug,
          description,
          image,
          sort_order,
        });

        res.status(201).json({ id, message: '分类创建成功' });
      } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ error: '创建分类失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
