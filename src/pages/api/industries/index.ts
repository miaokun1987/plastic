import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const industries = dbHelpers.getAllIndustries();
        res.status(200).json(industries);
      } catch (error) {
        console.error('Get industries error:', error);
        res.status(500).json({ error: '获取行业列表失败' });
      }
      break;

    case 'POST':
      try {
        const { name, slug, description, image, sort_order } = req.body;

        if (!name || !slug) {
          return res.status(400).json({ error: '行业名称和别名不能为空' });
        }

        const id = dbHelpers.createIndustry({
          name,
          slug,
          description,
          image,
          sort_order,
        });

        res.status(201).json({ id, message: '行业创建成功' });
      } catch (error) {
        console.error('Create industry error:', error);
        res.status(500).json({ error: '创建行业失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
