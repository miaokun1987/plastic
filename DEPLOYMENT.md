# 🚀 Vercel 部署指南

## 第一步：创建 GitHub 仓库并推送代码

### 1.1 初始化 Git 仓库

打开命令行（PowerShell 或 CMD），执行：

```bash
cd "E:\Qoder\独立站"
git init
git add .
git commit -m "Initial commit - 塑袋包装独立站"
```

### 1.2 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 输入仓库名称，例如：`plastic-packaging-website`
3. 选择 **Public**（公开）或 **Private**（私有）
4. **不要**勾选 "Add a README file"
5. 点击 "Create repository"

### 1.3 关联并推送代码

在 GitHub 仓库页面复制命令，然后执行：

```bash
# 关联远程仓库（替换为您的用户名和仓库名）
git remote add origin https://github.com/YOUR_USERNAME/plastic-packaging-website.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

---

## 第二步：在 Vercel 部署

### 2.1 注册/登录 Vercel

1. 访问 https://vercel.com
2. 点击 "Sign Up" 或 "Login"
3. 使用 **GitHub 账号登录**（推荐）

### 2.2 导入项目

1. 登录后点击 "Add New..." → "Project"
2. 在 "Import Git Repository" 页面找到您的仓库
3. 点击 "Import"

### 2.3 配置部署设置

保持默认设置即可：
- **Framework Preset**: Next.js（自动识别）
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 2.4 添加环境变量（重要！）

如果您的项目使用了环境变量（如数据库路径等），需要添加：

1. 点击 "Environment Variables"
2. 添加以下变量：
   - `DATABASE_PATH`: `data/database.json`
   - 其他您项目中使用的变量

> **注意**：当前项目使用 JSON 文件作为数据库，Vercel 是无服务器部署，每次部署后数据库会重置。建议后续考虑使用真正的数据库服务。

### 2.5 开始部署

点击 "Deploy" 按钮，等待 2-5 分钟完成部署。

部署成功后，您会获得一个免费域名：
```
https://plastic-packaging-website-YOUR_USERNAME.vercel.app
```

---

## 第三步：绑定自定义域名（可选）

### 3.1 在 Vercel 添加域名

1. 进入项目页面 → "Settings" → "Domains"
2. 输入您的域名，例如：`www.yourdomain.com`
3. 点击 "Add"

### 3.2 配置 DNS 解析

到您的域名注册商（如阿里云、腾讯云、GoDaddy）处添加 DNS 记录：

**方案 A：使用根域名**
```
类型：A
主机：@
值：76.76.21.21
TTL: 600
```

**方案 B：使用 CNAME（推荐）**
```
类型：CNAME
主机：www
值：cname.vercel-dns.com
TTL: 600
```

### 3.3 等待 DNS 生效

DNS 生效通常需要 10 分钟到 48 小时不等。

生效后，Vercel 会自动为您的域名配置 HTTPS 证书。

---

## 第四步：测试访问

### 4.1 访问网站

- Vercel 免费域名：`https://your-project.vercel.app`
- 自定义域名：`https://www.yourdomain.com`

### 4.2 测试功能

✅ 首页加载
✅ 产品页面
✅ 行业页面
✅ 后台管理系统
✅ 图片上传功能

---

## ⚠️ 重要注意事项

### 关于数据库

当前项目使用 `data/database.json` 作为数据库，这在 Vercel 上会有问题：

1. **数据不会持久化**：每次重新部署，数据库会重置
2. **多用户写入冲突**：Vercel 的无服务器架构不支持文件锁

**解决方案**：
1. **临时方案**：仅用于演示，不频繁更新数据
2. **推荐方案**：迁移到真正的数据库服务
   - [Supabase](https://supabase.com/) - 免费 PostgreSQL
   - [PlanetScale](https://planetscale.com/) - 免费 MySQL
   - [MongoDB Atlas](https://www.mongodb.com/atlas) - 免费 MongoDB

### 关于文件上传

当前上传的文件保存在 `public/uploads/`，在 Vercel 上：

1. **上传的文件不会持久化**：每次部署会被清除
2. **存储空间有限**：免费版有 100MB 限制

**解决方案**：
1. **使用云存储**：
   - [Uploadcare](https://uploadcare.com/) - 免费额度充足
   - [Cloudinary](https://cloudinary.com/) - 免费 25GB
   - AWS S3 / 阿里云 OSS

2. **或者修改 `.gitignore`**（仅当不频繁上传图片时）：
   ```
   # 注释掉这一行，让上传文件也被提交
   # public/uploads/*
   ```

---

## 🎉 完成！

现在您的网站已经上线，可以通过网络访问了！

如有问题，请查看：
- Vercel 控制台：https://vercel.com/dashboard
- 部署日志：项目页面 → "Deployments" → 点击最新部署

---

## 📚 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [自定义域名配置](https://vercel.com/docs/custom-domains)
- [环境变量配置](https://vercel.com/docs/environment-variables)
