import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: '缺少产品别名' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const product = dbHelpers.getProductBySlug(slug);

        if (!product) {
          return res.status(404).json({ error: '产品不存在' });
        }

        res.status(200).json(product);
      } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: '获取产品失败' });
      }
      break;

    case 'PUT':
      try {
        const { name, category_id, short_description, description, features, specifications, main_image, images, diagram_image, diagram_description, meta_title, meta_description, is_featured, sort_order } = req.body;

        const success = dbHelpers.updateProduct(slug, {
          name,
          category_id,
          short_description,
          description,
          features,
          specifications,
          main_image,
          images,
          diagram_image,
          diagram_description,
          meta_title,
          meta_description,
          is_featured,
          sort_order,
        });

        if (!success) {
          return res.status(404).json({ error: '产品不存在' });
        }

        res.status(200).json({ message: '产品更新成功' });
      } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: '更新产品失败' });
      }
      break;

    case 'DELETE':
      try {
        const success = dbHelpers.deleteProduct(slug);
        if (!success) {
          return res.status(404).json({ error: '产品不存在' });
        }
        res.status(200).json({ message: '产品删除成功' });
      } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: '删除产品失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
