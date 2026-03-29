import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: '无效的分类ID' });
  }

  const categoryId = Number(id);

  switch (req.method) {
    case 'PUT':
      try {
        const { name, slug, description, image, sort_order } = req.body;

        if (!name || !slug) {
          return res.status(400).json({ error: '分类名称和别名不能为空' });
        }

        const success = dbHelpers.updateCategory(categoryId, {
          name,
          slug,
          description,
          image,
          sort_order,
        });

        if (!success) {
          return res.status(404).json({ error: '分类不存在' });
        }

        res.status(200).json({ message: '分类更新成功' });
      } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ error: '更新分类失败' });
      }
      break;

    case 'DELETE':
      try {
        const success = dbHelpers.deleteCategory(categoryId);

        if (!success) {
          return res.status(404).json({ error: '分类不存在' });
        }

        res.status(200).json({ message: '分类删除成功' });
      } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ error: '删除分类失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
