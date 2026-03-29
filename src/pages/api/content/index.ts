import { NextApiRequest, NextApiResponse } from 'next';
import { dbHelpers } from '@/lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, section, key } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const content = dbHelpers.getContent(
          page as string | undefined,
          section as string | undefined,
          key as string | undefined
        );
        res.status(200).json(content);
      } catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({ error: '获取内容失败' });
      }
      break;

    case 'POST':
      try {
        const { page: p, section: s, key: k, value, image } = req.body;

        if (!p || !s || !k) {
          return res.status(400).json({ error: '页面、区块和键不能为空' });
        }

        dbHelpers.saveContent(p, s, k, value, image);
        res.status(200).json({ message: '内容保存成功' });
      } catch (error) {
        console.error('Save content error:', error);
        res.status(500).json({ error: '保存内容失败' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
