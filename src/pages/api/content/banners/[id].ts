import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: '缺少轮播图ID' });
  }

  const bannerId = parseInt(id);

  switch (req.method) {
    case 'PUT':
      try {
        const { title, subtitle, description, image, link, button_text, sort_order, is_active } = req.body;

        const success = dbHelpers.updateBanner(bannerId, {
          title,
          subtitle,
          description,
          image,
          link,
          button_text,
          sort_order,
          is_active,
        });

        if (!success) {
          return res.status(404).json({ error: '轮播图不存在' });
        }

        res.status(200).json({ message: '轮播图更新成功' });
      } catch (error) {
        console.error('Update banner error:', error);
        res.status(500).json({ error: '更新轮播图失败' });
      }
      break;

    case 'DELETE':
      try {
        const success = dbHelpers.deleteBanner(bannerId);
        if (!success) {
          return res.status(404).json({ error: '轮播图不存在' });
        }
        res.status(200).json({ message: '轮播图删除成功' });
      } catch (error) {
        console.error('Delete banner error:', error);
        res.status(500).json({ error: '删除轮播图失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
