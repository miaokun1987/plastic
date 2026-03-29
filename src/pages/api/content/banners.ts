import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const banners = dbHelpers.getAllBanners();
        res.status(200).json(banners);
      } catch (error) {
        console.error('Get banners error:', error);
        res.status(500).json({ error: '获取轮播图失败' });
      }
      break;

    case 'POST':
      try {
        const { title, subtitle, description, image, link, button_text, sort_order, is_active } = req.body;

        const id = dbHelpers.createBanner({
          title,
          subtitle,
          description,
          image,
          link,
          button_text,
          sort_order,
          is_active,
        });

        res.status(201).json({ id, message: '轮播图创建成功' });
      } catch (error) {
        console.error('Create banner error:', error);
        res.status(500).json({ error: '创建轮播图失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
