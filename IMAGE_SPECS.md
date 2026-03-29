# 图片规格说明

本项目所有图片的规格要求如下：

## 图片规格一览表

| 图片类型 | 建议尺寸 | 格式 | 用途 | 文件大小限制 |
|---------|---------|------|------|------------|
| Logo | 200 x 60 px | PNG/JPEG/SVG | 网站头部Logo | 100KB |
| Banner/轮播图 | 1920 x 600 px | JPEG | 首页轮播图 | 500KB |
| 产品主图 | 800 x 800 px | JPEG | 产品列表和详情页 | 300KB |
| 产品详情图 | 1200 x 800 px | JPEG | 产品详情页展示 | 500KB |
| 分类图片 | 400 x 300 px | JPEG | 分类展示图 | 200KB |
| 关于我们图片 | 600 x 400 px | JPEG | 首页关于我们区块 | 300KB |
| 工厂/公司图片 | 800 x 600 px | JPEG | 关于我们页面 | 400KB |

## 图片命名规范

- 产品图片：`product-[slug]-[number].jpg`（如：product-food-grade-pouch-1.jpg）
- 分类图片：`category-[slug].jpg`（如：category-lay-flat-pouches.jpg）
- Banner图片：`banner-[number].jpg`（如：banner-1.jpg）
- Logo图片：`logo.png` 或 `logo.jpg`

## 图片上传位置

- 产品图片：`/public/uploads/products/`
- Banner图片：`/public/uploads/banners/`
- Logo图片：`/public/uploads/logos/`
- 其他图片：`/public/uploads/others/`

## 默认占位图

项目已包含以下默认占位图（SVG格式）：
- `/images/product-placeholder.svg` - 产品占位图
- `/images/banner-placeholder.svg` - Banner占位图
- `/images/category-placeholder.svg` - 分类占位图
- `/images/logo-placeholder.svg` - Logo占位图
- `/images/about-placeholder.svg` - 关于我们占位图

## 图片优化建议

1. 所有图片建议使用JPEG格式，质量设置80-90%
2. Logo建议使用PNG格式（支持透明背景）
3. 图片文件大小应控制在建议限制内
4. 建议使用图片压缩工具压缩后再上传
