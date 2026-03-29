import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'database.json');

interface Database {
  users: User[];
  categories: Category[];
  products: Product[];
  siteContent: SiteContent[];
  banners: Banner[];
  menus: Menu[];
  industries: Industry[];
}

interface User {
  id: number;
  username: string;
  password: string;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
  createdAt: string;
}

interface Industry {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  categoryId: number | null;
  shortDescription: string;
  description: string;
  features: string;
  specifications: string;
  mainImage: string;
  images: string;
  diagramImage: string;
  diagramDescription: string;
  metaTitle: string;
  metaDescription: string;
  isFeatured: number;
  sortOrder: number;
  createdAt: string;
}

interface SiteContent {
  id: number;
  page: string;
  section: string;
  key: string;
  value: string;
  image: string;
  createdAt: string;
}

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
  sortOrder: number;
  isActive: number;
  createdAt: string;
}

interface Menu {
  id: number;
  name: string;
  url: string;
  parentId: number | null;
  sortOrder: number;
  isActive: number;
  createdAt: string;
}

let db: Database | null = null;

export function getDatabase(): Database {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  db = loadDatabase();
  initializeDatabase();
  return db;
}

function loadDatabase(): Database {
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  }
  return {
    users: [],
    categories: [],
    products: [],
    siteContent: [],
    banners: [],
    menus: [],
    industries: [],
  };
}

export function saveDatabase(): void {
  if (db) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
  }
}

function initializeDatabase(): void {
  if (!db) return;

  // 初始化默认管理员账户
  if (db.users.length === 0) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync('admin', 10);
    db.users.push({
      id: 1,
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });
  }

  // 初始化默认分类
  if (db.categories.length === 0) {
    const defaultCategories = [
      { name: '平口袋 (Lay Flat Pouches)', slug: 'lay-flat-pouches', description: '适用于各种产品的平口袋包装解决方案' },
      { name: '站立袋 (Stand Up Pouches)', slug: 'stand-up-pouches', description: '自站立袋，提供优异的货架展示效果' },
      { name: '拉链袋 (Zipper Pouches)', slug: 'zipper-pouches', description: '可重复密封的拉链袋包装' },
      { name: '收缩膜 (Shrink Film)', slug: 'shrink-film', description: '热收缩膜包装材料' },
      { name: '真空袋 (Vacuum Pouches)', slug: 'vacuum-pouches', description: '真空包装袋，延长产品保质期' },
      { name: '自立袋 (Spouted Pouches)', slug: 'spouted-pouches', description: '带嘴袋，适用于液体产品包装' },
    ];
    defaultCategories.forEach((cat, index) => {
      db!.categories.push({
        id: index + 1,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: '',
        sortOrder: index,
        createdAt: new Date().toISOString(),
      });
    });
  }

  // 初始化默认行业
  if (db.industries.length === 0) {
    const defaultIndustries = [
      { name: '食品行业', slug: 'food', description: '为食品行业提供保鲜、防潮、防氧化的包装解决方案，符合 FDA 食品安全标准。适用于咖啡、坚果、零食、调味品等各类食品。' },
      { name: '饮料行业', slug: 'beverage', description: '为饮料行业提供专业的液体包装解决方案，包括自立袋、吸管袋等。适用于果汁、茶饮、乳制品、功能饮料等产品。' },
      { name: '医药行业', slug: 'pharmaceutical', description: '为医药行业提供符合 GMP 标准的药品包装，具有优异的阻隔性和密封性。适用于药片、胶囊、粉末、医疗器械等产品。' },
      { name: '化工行业', slug: 'chemical', description: '为化工行业提供耐腐蚀、防静电的专业包装解决方案。适用于化工原料、涂料、油墨、清洁剂等产品。' },
      { name: '农业行业', slug: 'agriculture', description: '为农业行业提供防潮、防霉、防虫的包装解决方案。适用于种子、化肥、农药、饲料等农资产品。' },
      { name: '宠物食品行业', slug: 'pet-food', description: '为宠物食品行业提供高阻隔、保香性好的专业包装。适用于猫粮、狗粮、宠物零食、宠物罐头等产品。' },
    ];
    defaultIndustries.forEach((ind, index) => {
      db!.industries.push({
        id: index + 1,
        name: ind.name,
        slug: ind.slug,
        description: ind.description,
        image: `/images/industry-${ind.slug}.svg`,
        sortOrder: index,
        createdAt: new Date().toISOString(),
      });
    });
  }

  // 初始化默认产品
  if (db.products.length === 0) {
    const defaultProducts = [
      {
        name: '食品级平口袋',
        slug: 'food-grade-lay-flat-pouch',
        categoryId: 1,
        shortDescription: '专为食品行业设计的高品质平口袋包装',
        description: '我们的食品级平口袋采用优质原材料制造，符合FDA食品安全标准。适用于咖啡、坚果、干果、茶叶等各种食品包装。可定制各种尺寸、厚度和印刷图案。',
        features: JSON.stringify(['食品级材料', '防潮防氧化', '可定制印刷', '多种尺寸可选', '环保可回收']),
        specifications: JSON.stringify([
          { name: '材质', value: 'PET/AL/PE, PET/PE, BOPP/PE' },
          { name: '厚度', value: '50-150微米' },
          { name: '尺寸', value: '可定制' },
          { name: '印刷', value: '支持8色凹版印刷' },
          { name: '认证', value: 'FDA, QS, ISO9001' },
        ]),
      },
      {
        name: '工业用重型平口袋',
        slug: 'industrial-heavy-duty-lay-flat-pouch',
        categoryId: 1,
        shortDescription: '适用于工业产品的耐用平口袋',
        description: '工业用重型平口袋采用加厚材料设计，具有优异的耐磨性和承重能力。适用于化工原料、五金配件、建筑材料等产品的包装。',
        features: JSON.stringify(['高承重能力', '耐磨耐撕裂', '防静电可选', '防潮防水', '批量优惠']),
        specifications: JSON.stringify([
          { name: '材质', value: 'BOPP/PP, PE/PA' },
          { name: '厚度', value: '80-200微米' },
          { name: '承重', value: '5-50kg' },
          { name: '印刷', value: '支持多色印刷' },
          { name: '认证', value: 'ISO9001, SGS' },
        ]),
      },
      {
        name: '站立拉链袋',
        slug: 'stand-up-zipper-pouch',
        categoryId: 2,
        shortDescription: '自站立设计，带拉链密封，便于储存',
        description: '站立拉链袋结合了站立袋的展示优势和拉链袋的便利性。产品可在货架上自立展示，消费者可轻松打开和重新密封，延长内容物保质期。',
        features: JSON.stringify(['自立展示', '可重复密封', '优异阻隔性', '增强品牌形象', '环保材料可选']),
        specifications: JSON.stringify([
          { name: '材质', value: 'PET/AL/PE, NY/AL/PE' },
          { name: '容量', value: '50g-5kg' },
          { name: '拉链类型', value: '易撕拉链/普通拉链' },
          { name: '袋型', value: '平底/圆底' },
          { name: '认证', value: 'FDA, QS, ISO14001' },
        ]),
      },
      {
        name: '高透明收缩膜',
        slug: 'high-clarity-shrink-film',
        categoryId: 4,
        shortDescription: '高透明度收缩膜，完美展示产品',
        description: '高透明收缩膜采用优质POF/PVC材料，具有优异的收缩率和透明度。适用于食品、饮料、日用品等产品的包装，提供出色的产品展示效果和保护性能。',
        features: JSON.stringify(['高透明度', '快速收缩', '强韧耐用', '环保无毒', '适用于高速包装机']),
        specifications: JSON.stringify([
          { name: '材质', value: 'POF, PVC, PE' },
          { name: '厚度', value: '12-30微米' },
          { name: '收缩率', value: '40-70%' },
          { name: '宽度', value: '200-800mm' },
          { name: '认证', value: 'FDA, SGS, ROHS' },
        ]),
      },
      {
        name: '真空保鲜袋',
        slug: 'vacuum-freshness-pouch',
        categoryId: 5,
        shortDescription: '专业真空包装解决方案，延长产品保质期',
        description: '真空保鲜袋专为需要长期保存的产品设计，有效阻隔氧气和水分，延长产品保质期3-5倍。适用于肉类、海鲜、奶酪、坚果等食品的真空包装。',
        features: JSON.stringify(['优异阻氧性能', '超强密封', '防穿刺', '耐低温', '可定制印刷']),
        specifications: JSON.stringify([
          { name: '材质', value: 'PA/PE, PET/AL/PA/PE' },
          { name: '厚度', value: '80-180微米' },
          { name: '阻氧率', value: '<1 cc/m²/day' },
          { name: '耐温', value: '-40°C至121°C' },
          { name: '认证', value: 'FDA, QS, HACCP' },
        ]),
      },
      {
        name: '液体自立袋',
        slug: 'liquid-spouted-pouch',
        categoryId: 6,
        shortDescription: '带嘴袋设计，适合液体产品包装',
        description: '液体自立袋专为液体产品设计的创新包装方案。配有螺旋嘴或吸嘴，方便倒出和储存。适用于果汁、饮料、调味品、洗涤剂等液体产品。',
        features: JSON.stringify(['自立设计', '防漏嘴设计', '易倒出', '可重复使用', '便携轻便']),
        specifications: JSON.stringify([
          { name: '材质', value: 'PET/NY/PE, PET/AL/NY/PE' },
          { name: '容量', value: '100ml-5L' },
          { name: '嘴径', value: '8.5mm-30mm' },
          { name: '嘴类型', value: '螺旋嘴/吸嘴' },
          { name: '认证', value: 'FDA, QS, BRC' },
        ]),
      },
    ];

    defaultProducts.forEach((product, index) => {
      db!.products.push({
        id: index + 1,
        name: product.name,
        slug: product.slug,
        categoryId: product.categoryId,
        shortDescription: product.shortDescription,
        description: product.description,
        features: product.features,
        specifications: product.specifications,
        mainImage: '',
        images: '',
        diagramImage: '',
        diagramDescription: '',
        metaTitle: '',
        metaDescription: '',
        isFeatured: 0,
        sortOrder: index,
        createdAt: new Date().toISOString(),
      });
    });
  }

  // 初始化轮播图
  if (db.banners.length === 0) {
    const defaultBanners = [
      {
        title: '专业塑料包装解决方案',
        subtitle: '品质包装，值得信赖',
        description: '20年行业经验，为您的产品提供最佳包装方案',
        image: '/images/banner-placeholder.svg',
        link: '/products',
        buttonText: '查看产品',
      },
      {
        title: '环保可降解材料',
        subtitle: '可持续发展',
        description: '我们致力于研发环保包装材料，减少环境影响',
        image: '/images/banner-placeholder.svg',
        link: '/products/lay-flat-pouches',
        buttonText: '了解更多',
      },
      {
        title: '定制化服务',
        subtitle: '您的需求，我们的专业',
        description: '提供从设计到生产的全方位定制服务',
        image: '/images/banner-placeholder.svg',
        link: '/contact',
        buttonText: '联系我们',
      },
    ];

    defaultBanners.forEach((banner, index) => {
      db!.banners.push({
        id: index + 1,
        title: banner.title,
        subtitle: banner.subtitle,
        description: banner.description,
        image: banner.image,
        link: banner.link,
        buttonText: banner.buttonText,
        sortOrder: index,
        isActive: 1,
        createdAt: new Date().toISOString(),
      });
    });
  }

  // 确保所有必需的内容存在（不仅仅是检查是否为空）
  ensureContentExists();

  saveDatabase();
}

// 确保必需的内容存在
function ensureContentExists(): void {
  if (!db) return;

  const defaultContent = [
    // 首页内容
    { page: 'home', section: 'header', key: 'logo', value: '塑袋包装', image: '/images/logo-placeholder.svg' },
    { page: 'home', section: 'header', key: 'phone', value: '400-888-8888' },
    { page: 'home', section: 'header', key: 'email', value: 'info@packaging.com' },
    { page: 'home', section: 'about', key: 'title', value: '关于我们' },
    { page: 'home', section: 'about', key: 'description', value: '我们是专业的塑料包装解决方案提供商，拥有20年行业经验，为全球客户提供高品质的包装产品。我们致力于创新和可持续发展，为您的产品提供最佳包装方案。' },
    { page: 'home', section: 'about', key: 'image', value: '/images/about-placeholder.svg' },
    { page: 'home', section: 'features', key: 'title', value: '为什么选择我们' },
    { page: 'home', section: 'features', key: 'feature1_title', value: '品质保证' },
    { page: 'home', section: 'features', key: 'feature1_desc', value: '所有产品均通过ISO9001质量认证，确保每一件产品都符合最高标准' },
    { page: 'home', section: 'features', key: 'feature2_title', value: '定制服务' },
    { page: 'home', section: 'features', key: 'feature2_desc', value: '提供全方位定制服务，从设计到生产，满足您的个性化需求' },
    { page: 'home', section: 'features', key: 'feature3_title', value: '快速交付' },
    { page: 'home', section: 'features', key: 'feature3_desc', value: '高效的生产流程，确保订单按时交付，支持紧急订单处理' },
    { page: 'home', section: 'features', key: 'feature4_title', value: '环保材料' },
    { page: 'home', section: 'features', key: 'feature4_desc', value: '采用环保可降解材料，减少对环境的影响，践行可持续发展' },
    { page: 'home', section: 'cta', key: 'title', value: '开始您的包装项目' },
    { page: 'home', section: 'cta', key: 'description', value: '联系我们获取免费样品和报价，我们的专业团队将为您提供最佳解决方案' },
    { page: 'home', section: 'cta', key: 'button_text', value: '获取报价' },
    // 页脚内容
    { page: 'footer', section: 'company', key: 'name', value: '塑袋包装科技有限公司' },
    { page: 'footer', section: 'company', key: 'address', value: '中国上海市浦东新区包装产业园88号' },
    { page: 'footer', section: 'company', key: 'phone', value: '400-888-8888' },
    { page: 'footer', section: 'company', key: 'email', value: 'info@packaging.com' },
    { page: 'footer', section: 'social', key: 'linkedin', value: 'linkedin.com/company/yourcompany' },
    { page: 'footer', section: 'social', key: 'facebook', value: 'facebook.com/yourpage' },
    { page: 'footer', section: 'social', key: 'instagram', value: '@yourhandle' },
    { page: 'footer', section: 'copyright', key: 'text', value: '© 2024 塑袋包装科技有限公司 版权所有' },
    // 行业页面内容
    { page: 'industries', section: 'hero', key: 'title', value: '行业应用' },
    { page: 'industries', section: 'hero', key: 'subtitle', value: '为各行各业提供专业包装解决方案' },
    { page: 'industries', section: 'intro', key: 'title', value: '专业行业解决方案' },
    { page: 'industries', section: 'intro', key: 'description', value: '我们拥有丰富的行业经验，深入了解不同行业的包装需求。无论是食品保鲜、医药安全还是工业防护，我们都能为您提供最适合的包装方案。' },
    { page: 'industries', section: 'cta', key: 'title', value: '开始您的项目' },
    { page: 'industries', section: 'cta', key: 'description', value: '联系我们，获取针对您行业的专业包装方案' },
    // 行业页面 - 服务行业部分
    { page: 'industries', section: 'service_intro', key: 'title', value: '服务行业' },
    { page: 'industries', section: 'service_intro', key: 'subtitle', value: '我们服务的行业领域' },
    // 行业页面 - 为什么选择我们部分
    { page: 'industries', section: 'why_choose', key: 'title', value: '为什么选择我们' },
    { page: 'industries', section: 'why_choose', key: 'feature1_title', value: '行业认证' },
    { page: 'industries', section: 'why_choose', key: 'feature1_desc', value: '通过 FDA、ISO 等多项国际认证' },
    { page: 'industries', section: 'why_choose', key: 'feature2_title', value: '定制研发' },
    { page: 'industries', section: 'why_choose', key: 'feature2_desc', value: '针对行业特点定制包装方案' },
    { page: 'industries', section: 'why_choose', key: 'feature3_title', value: '快速响应' },
    { page: 'industries', section: 'why_choose', key: 'feature3_desc', value: '24 小时内响应客户需求' },
    { page: 'industries', section: 'why_choose', key: 'feature4_title', value: '全球服务' },
    { page: 'industries', section: 'why_choose', key: 'feature4_desc', value: '产品远销全球 50 多个国家' },
    // 环保页面内容
    { page: 'sustainability', section: 'hero', key: 'title', value: '环保承诺' },
    { page: 'sustainability', section: 'hero', key: 'subtitle', value: '软包装与环境可持续发展' },
    { page: 'sustainability', section: 'intro', key: 'title', value: '我们的环保理念' },
    { page: 'sustainability', section: 'intro', key: 'description', value: '作为包装行业的一员，我们深知环境保护的重要性。我们致力于研发和推广环保型包装材料，通过技术创新减少包装对环境的影响，为客户和地球创造可持续的未来。' },
    { page: 'sustainability', section: 'intro', key: 'description2', value: '我们相信，优质的包装不仅要保护产品，更要保护我们的地球。从材料选择到生产工艺，每一个环节我们都力求做到环保、节能、可持续。' },
    { page: 'sustainability', section: 'intro', key: 'image', value: '/images/about-placeholder.svg' },
    { page: 'sustainability', section: 'cta', key: 'title', value: '选择环保包装，共创美好未来' },
    { page: 'sustainability', section: 'cta', key: 'description', value: '联系我们，了解更多环保包装解决方案' },
  ];

  // 检查并添加缺失的内容
  defaultContent.forEach((item) => {
    const exists = db!.siteContent.find(
      (c) => c.page === item.page && c.section === item.section && c.key === item.key
    );
    if (!exists) {
      const newId = Math.max(...db!.siteContent.map((c) => c.id), 0) + 1;
      db!.siteContent.push({
        id: newId,
        page: item.page,
        section: item.section,
        key: item.key,
        value: item.value || '',
        image: item.image || '',
        createdAt: new Date().toISOString(),
      });
    }
  });
}

// Helper functions for common operations
export const dbHelpers = {
  // Products
  getAllProducts: () => {
    const db = getDatabase();
    return db.products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category_id: p.categoryId,
      short_description: p.shortDescription,
      description: p.description,
      features: p.features,
      specifications: p.specifications,
      main_image: p.mainImage,
      images: p.images,
      diagram_image: p.diagramImage || '',
      diagram_description: p.diagramDescription || '',
      meta_title: p.metaTitle,
      meta_description: p.metaDescription,
      is_featured: p.isFeatured,
      sort_order: p.sortOrder,
      createdAt: p.createdAt,
      category_name: p.categoryId ? db.categories.find((c) => c.id === p.categoryId)?.name || null : null,
      category_slug: p.categoryId ? db.categories.find((c) => c.id === p.categoryId)?.slug || null : null,
    }));
  },

  getProductBySlug: (slug: string) => {
    const db = getDatabase();
    const p = db.products.find((p) => p.slug === slug);
    if (!p) return null;
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      category_id: p.categoryId,
      short_description: p.shortDescription,
      description: p.description,
      features: p.features,
      specifications: p.specifications,
      main_image: p.mainImage,
      images: p.images,
      diagram_image: p.diagramImage || '',
      diagram_description: p.diagramDescription || '',
      meta_title: p.metaTitle,
      meta_description: p.metaDescription,
      is_featured: p.isFeatured,
      sort_order: p.sortOrder,
      createdAt: p.createdAt,
      category_name: p.categoryId ? db.categories.find((c) => c.id === p.categoryId)?.name || null : null,
      category_slug: p.categoryId ? db.categories.find((c) => c.id === p.categoryId)?.slug || null : null,
    };
  },

  createProduct: (data: any) => {
    const db = getDatabase();
    const newId = Math.max(...db.products.map((p) => p.id), 0) + 1;
    const newProduct: Product = {
      id: newId,
      name: data.name,
      slug: data.slug,
      categoryId: data.category_id || null,
      shortDescription: data.short_description || '',
      description: data.description || '',
      features: data.features || '',
      specifications: data.specifications || '',
      mainImage: data.main_image || '',
      images: data.images || '',
      diagramImage: data.diagram_image || '',
      diagramDescription: data.diagram_description || '',
      metaTitle: data.meta_title || '',
      metaDescription: data.meta_description || '',
      isFeatured: data.is_featured || 0,
      sortOrder: data.sort_order || 0,
      createdAt: new Date().toISOString(),
    };
    db.products.push(newProduct);
    saveDatabase();
    return newId;
  },

  updateProduct: (slug: string, data: any) => {
    const db = getDatabase();
    const index = db.products.findIndex((p) => p.slug === slug);
    if (index === -1) return false;
    db.products[index] = {
      ...db.products[index],
      name: data.name,
      categoryId: data.category_id,
      shortDescription: data.short_description,
      description: data.description,
      features: data.features,
      specifications: data.specifications,
      mainImage: data.main_image,
      images: data.images,
      diagramImage: data.diagram_image,
      diagramDescription: data.diagram_description,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      isFeatured: data.is_featured,
      sortOrder: data.sort_order,
    };
    saveDatabase();
    return true;
  },

  deleteProduct: (slug: string) => {
    const db = getDatabase();
    const index = db.products.findIndex((p) => p.slug === slug);
    if (index === -1) return false;
    db.products.splice(index, 1);
    saveDatabase();
    return true;
  },

  // Categories
  getAllCategories: () => {
    const db = getDatabase();
    return db.categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      sort_order: c.sortOrder,
      createdAt: c.createdAt,
    }));
  },

  createCategory: (data: any) => {
    const db = getDatabase();
    const newId = Math.max(...db.categories.map((c) => c.id), 0) + 1;
    const newCategory: Category = {
      id: newId,
      name: data.name,
      slug: data.slug,
      description: data.description || '',
      image: data.image || '',
      sortOrder: data.sort_order || 0,
      createdAt: new Date().toISOString(),
    };
    db.categories.push(newCategory);
    saveDatabase();
    return newId;
  },

  updateCategory: (id: number, data: any) => {
    const db = getDatabase();
    const index = db.categories.findIndex((c) => c.id === id);
    if (index === -1) return false;
    db.categories[index] = {
      ...db.categories[index],
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image,
      sortOrder: data.sort_order,
    };
    saveDatabase();
    return true;
  },

  deleteCategory: (id: number) => {
    const db = getDatabase();
    const index = db.categories.findIndex((c) => c.id === id);
    if (index === -1) return false;
    db.categories.splice(index, 1);
    saveDatabase();
    return true;
  },

  // Industries
  getAllIndustries: () => {
    const db = getDatabase();
    return db.industries.map((i) => ({
      id: i.id,
      name: i.name,
      slug: i.slug,
      description: i.description,
      image: i.image,
      sort_order: i.sortOrder,
      createdAt: i.createdAt,
    }));
  },

  createIndustry: (data: any) => {
    const db = getDatabase();
    const newId = Math.max(...db.industries.map((i) => i.id), 0) + 1;
    const newIndustry: Industry = {
      id: newId,
      name: data.name,
      slug: data.slug,
      description: data.description || '',
      image: data.image || '',
      sortOrder: data.sort_order || 0,
      createdAt: new Date().toISOString(),
    };
    db.industries.push(newIndustry);
    saveDatabase();
    return newId;
  },

  updateIndustry: (id: number, data: any) => {
    const db = getDatabase();
    const index = db.industries.findIndex((i) => i.id === id);
    if (index === -1) return false;
    db.industries[index] = {
      ...db.industries[index],
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image,
      sortOrder: data.sort_order,
    };
    saveDatabase();
    return true;
  },

  deleteIndustry: (id: number) => {
    const db = getDatabase();
    const index = db.industries.findIndex((i) => i.id === id);
    if (index === -1) return false;
    db.industries.splice(index, 1);
    saveDatabase();
    return true;
  },

  // Banners
  getAllBanners: () => {
    const db = getDatabase();
    return db.banners.map((b) => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      description: b.description,
      image: b.image,
      link: b.link,
      button_text: b.buttonText,
      sort_order: b.sortOrder,
      is_active: b.isActive,
      createdAt: b.createdAt,
    }));
  },

  createBanner: (data: any) => {
    const db = getDatabase();
    const newId = Math.max(...db.banners.map((b) => b.id), 0) + 1;
    const newBanner: Banner = {
      id: newId,
      title: data.title || '',
      subtitle: data.subtitle || '',
      description: data.description || '',
      image: data.image || '',
      link: data.link || '',
      buttonText: data.button_text || '',
      sortOrder: data.sort_order || 0,
      isActive: data.is_active !== undefined ? data.is_active : 1,
      createdAt: new Date().toISOString(),
    };
    db.banners.push(newBanner);
    saveDatabase();
    return newId;
  },

  updateBanner: (id: number, data: any) => {
    const db = getDatabase();
    const index = db.banners.findIndex((b) => b.id === id);
    if (index === -1) return false;
    db.banners[index] = {
      ...db.banners[index],
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      image: data.image,
      link: data.link,
      buttonText: data.button_text,
      sortOrder: data.sort_order,
      isActive: data.is_active,
    };
    saveDatabase();
    return true;
  },

  deleteBanner: (id: number) => {
    const db = getDatabase();
    const index = db.banners.findIndex((b) => b.id === id);
    if (index === -1) return false;
    db.banners.splice(index, 1);
    saveDatabase();
    return true;
  },

  // Site Content
  getAllContent: () => {
    const db = getDatabase();
    return db.siteContent;
  },

  getContent: (page?: string, section?: string, key?: string) => {
    const db = getDatabase();
    let results = db.siteContent;
    if (page) results = results.filter((c) => c.page === page);
    if (section) results = results.filter((c) => c.section === section);
    if (key) results = results.filter((c) => c.key === key);
    return results;
  },

  saveContent: (page: string, section: string, key: string, value: string, image?: string) => {
    const db = getDatabase();
    const existingIndex = db.siteContent.findIndex((c) => c.page === page && c.section === section && c.key === key);
    if (existingIndex !== -1) {
      db.siteContent[existingIndex] = {
        ...db.siteContent[existingIndex],
        value: value,
        image: image !== undefined ? image : db.siteContent[existingIndex].image,
        createdAt: db.siteContent[existingIndex].createdAt,
      };
    } else {
      const newId = Math.max(...db.siteContent.map((c) => c.id), 0) + 1;
      db.siteContent.push({
        id: newId,
        page,
        section,
        key,
        value,
        image: image || '',
        createdAt: new Date().toISOString(),
      });
    }
    saveDatabase();
    return true;
  },

  // Users
  getUserByUsername: (username: string) => {
    const db = getDatabase();
    return db.users.find((u) => u.username === username) || null;
  },
};

export default getDatabase;
