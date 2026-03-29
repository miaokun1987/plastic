import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: '缺少行业别名' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const industries = dbHelpers.getAllIndustries();
        const industry = industries.find((i) => i.slug === slug);

        if (!industry) {
          return res.status(404).json({ error: '行业不存在' });
        }

        res.status(200).json(industry);
      } catch (error) {
        console.error('Get industry error:', error);
        res.status(500).json({ error: '获取行业失败' });
      }
      break;

    case 'PUT':
      try {
        const id = parseInt(req.body.id);
        const { name, slug: newSlug, description, image, sort_order } = req.body;

        if (!id || !name || !newSlug) {
          return res.status(400).json({ error: '行业 ID、名称和别名不能为空' });
        }

        const success = dbHelpers.updateIndustry(id, {
          name,
          slug: newSlug,
          description,
          image,
          sort_order,
        });

        if (!success) {
          return res.status(404).json({ error: '行业不存在' });
        }

        res.status(200).json({ message: '行业更新成功' });
      } catch (error) {
        console.error('Update industry error:', error);
        res.status(500).json({ error: '更新行业失败' });
      }
      break;

    case 'DELETE':
      try {
        const id = parseInt(req.query.id as string);
        if (!id) {
          return res.status(400).json({ error: '行业 ID 不能为空' });
        }

        const success = dbHelpers.deleteIndustry(id);
        if (!success) {
          return res.status(404).json({ error: '行业不存在' });
        }

        res.status(200).json({ message: '行业删除成功' });
      } catch (error) {
        console.error('Delete industry error:', error);
        res.status(500).json({ error: '删除行业失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
