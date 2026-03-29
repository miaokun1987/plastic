import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const products = dbHelpers.getAllProducts();
        res.status(200).json(products);
      } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: '获取产品列表失败' });
      }
      break;

    case 'POST':
      try {
        const { name, slug, category_id, short_description, description, features, specifications, main_image, images, diagram_image, diagram_description, meta_title, meta_description, is_featured, sort_order } = req.body;

        if (!name || !slug) {
          return res.status(400).json({ error: '产品名称和别名不能为空' });
        }

        const id = dbHelpers.createProduct({
          name,
          slug,
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

        res.status(201).json({ id, message: '产品创建成功' });
      } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: '创建产品失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
