import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  if (!filename || Array.isArray(filename)) {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  // 构建文件路径
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  // 读取文件内容
  const fileContent = fs.readFileSync(filePath);

  // 根据文件类型设置 Content-Type
  const ext = path.extname(filename).toLowerCase();
  const contentTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  };

  const contentType = contentTypes[ext] || 'application/octet-stream';

  // 设置缓存控制 - 允许浏览器缓存但需要验证
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  res.setHeader('Content-Type', contentType);
  
  // 发送文件
  res.send(fileContent);
}
