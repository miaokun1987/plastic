import path from 'path';
import fs from 'fs';

// 延迟确定数据库路径，在函数调用时才解析
const getDbPath = (): string => {
  // 尝试多个可能的路径
  const possiblePaths = [
    path.join(process.cwd(), 'data', 'database.json'),
    path.resolve(__dirname, '../../../data/database.json'),
    '/opt/build/repo/data/database.json', // Netlify 环境
  ];
  
  for (const p of possiblePaths) {
    if (p && fs.existsSync(p)) {
      return p;
    }
  }
  
  // 如果都找不到，返回默认路径（会抛出错误）
  return path.join(process.cwd(), 'data', 'database.json');
};

// 获取数据库内容，带错误处理
const getDatabaseContent = (): Database => {
  const dbPath = getDbPath();
  if (!fs.existsSync(dbPath)) {
    console.error('Database file not found at:', dbPath);
    console.error('Current working directory:', process.cwd());
    console.error('__dirname:', __dirname);
    throw new Error(`Database file not found: ${dbPath}`);
  }
  
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', dbPath, error);
    throw error;
  }
};

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
  const dbPath = getDbPath();
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  db = loadDatabase(dbPath);
  initializeDatabase();
  return db;
}

function loadDatabase(dbPath: string): Database {
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
    const dbPath = getDbPath();
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

  // Initialize default categories
  if (db.categories.length === 0) {
    const defaultCategories = [
      { name: 'Lay Flat Pouches', slug: 'lay-flat-pouches', description: 'Lay flat pouch packaging solutions for various products' },
      { name: 'Stand Up Pouches', slug: 'stand-up-pouches', description: 'Self-standing pouches providing excellent shelf display effects' },
      { name: 'Zipper Pouches', slug: 'zipper-pouches', description: 'Resealable zipper pouch packaging' },
      { name: 'Shrink Film', slug: 'shrink-film', description: 'Heat shrink film packaging material' },
      { name: 'Vacuum Pouches', slug: 'vacuum-pouches', description: 'Vacuum packaging bags to extend product shelf life' },
      { name: 'Spouted Pouches', slug: 'spouted-pouches', description: 'Spouted pouches suitable for liquid product packaging' },
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

  // Initialize default industries
  if (db.industries.length === 0) {
    const defaultIndustries = [
      { name: 'Food Industry', slug: 'food', description: 'Providing fresh-keeping, moisture-proof, and oxidation-resistant packaging solutions for the food industry, compliant with FDA food safety standards. Suitable for coffee, nuts, snacks, seasonings, and various other food products.' },
      { name: 'Beverage Industry', slug: 'beverage', description: 'Providing professional liquid packaging solutions for the beverage industry, including stand-up pouches, straw pouches, etc. Suitable for juices, tea drinks, dairy products, functional beverages, and other products.' },
      { name: 'Pharmaceutical Industry', slug: 'pharmaceutical', description: 'Providing pharmaceutical packaging compliant with GMP standards, with excellent barrier and sealing properties. Suitable for tablets, capsules, powders, medical devices, and other products.' },
      { name: 'Chemical Industry', slug: 'chemical', description: 'Providing professional packaging solutions for the chemical industry with corrosion resistance and anti-static properties. Suitable for chemical raw materials, coatings, inks, cleaning agents, and other products.' },
      { name: 'Agriculture Industry', slug: 'agriculture', description: 'Providing moisture-proof, mildew-proof, and insect-proof packaging solutions for the agriculture industry. Suitable for seeds, fertilizers, pesticides, feed, and other agricultural products.' },
      { name: 'Pet Food Industry', slug: 'pet-food', description: 'Providing professional packaging with high barrier and excellent fragrance retention for the pet food industry. Suitable for cat food, dog food, pet snacks, pet canned food, and other products.' },
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

  // Initialize default products
  if (db.products.length === 0) {
    const defaultProducts = [
      {
        name: 'Food Grade Lay Flat Pouch',
        slug: 'food-grade-lay-flat-pouch',
        categoryId: 1,
        shortDescription: 'High-quality lay flat pouch packaging designed specifically for the food industry',
        description: 'Our food-grade lay flat pouches are made from premium raw materials and comply with FDA food safety standards. Suitable for packaging coffee, nuts, dried fruits, tea, and various other food products. Customizable sizes, thicknesses, and printing patterns.',
        features: JSON.stringify(['Food Grade Material', 'Moisture and Oxidation Resistant', 'Customizable Printing', 'Multiple Sizes Available', 'Eco-friendly and Recyclable']),
        specifications: JSON.stringify([
          { name: 'Material', value: 'PET/AL/PE, PET/PE, BOPP/PE' },
          { name: 'Thickness', value: '50-150 microns' },
          { name: 'Size', value: 'Customizable' },
          { name: 'Printing', value: 'Supports 8-color gravure printing' },
          { name: 'Certifications', value: 'FDA, QS, ISO9001' },
        ]),
      },
      {
        name: 'Industrial Heavy Duty Lay Flat Pouch',
        slug: 'industrial-heavy-duty-lay-flat-pouch',
        categoryId: 1,
        shortDescription: 'Durable lay flat pouch suitable for industrial products',
        description: 'Industrial heavy duty lay flat pouches are designed with thickened materials, offering excellent wear resistance and load-bearing capacity. Suitable for packaging chemical raw materials, hardware accessories, building materials, and other products.',
        features: JSON.stringify(['High Load Capacity', 'Wear and Tear Resistant', 'Anti-static Optional', 'Moisture and Water Proof', 'Bulk Discounts Available']),
        specifications: JSON.stringify([
          { name: 'Material', value: 'BOPP/PP, PE/PA' },
          { name: 'Thickness', value: '80-200 microns' },
          { name: 'Load Capacity', value: '5-50kg' },
          { name: 'Printing', value: 'Supports multi-color printing' },
          { name: 'Certifications', value: 'ISO9001, SGS' },
        ]),
      },
      {
        name: 'Stand Up Zipper Pouch',
        slug: 'stand-up-zipper-pouch',
        categoryId: 2,
        shortDescription: 'Self-standing design with zipper seal for easy storage',
        description: 'Stand up zipper pouches combine the display advantages of stand-up pouches with the convenience of zipper pouches. Products can stand independently on shelves, and consumers can easily open and reseal them, extending the shelf life of contents.',
        features: JSON.stringify(['Self-standing Display', 'Resealable', 'Excellent Barrier Properties', 'Enhanced Brand Image', 'Eco-friendly Materials Available']),
        specifications: JSON.stringify([
          { name: 'Material', value: 'PET/AL/PE, NY/AL/PE' },
          { name: 'Capacity', value: '50g-5kg' },
          { name: 'Zipper Type', value: 'Easy-tear Zipper/Standard Zipper' },
          { name: 'Pouch Type', value: 'Flat Bottom/Round Bottom' },
          { name: 'Certifications', value: 'FDA, QS, ISO14001' },
        ]),
      },
      {
        name: 'High Clarity Shrink Film',
        slug: 'high-clarity-shrink-film',
        categoryId: 4,
        shortDescription: 'High clarity shrink film for perfect product display',
        description: 'High clarity shrink film uses premium POF/PVC materials with excellent shrinkage rate and transparency. Suitable for packaging food, beverages, daily necessities, and other products, providing outstanding product display effects and protection performance.',
        features: JSON.stringify(['High Transparency', 'Fast Shrinkage', 'Strong and Durable', 'Eco-friendly and Non-toxic', 'Suitable for High-speed Packaging Machines']),
        specifications: JSON.stringify([
          { name: 'Material', value: 'POF, PVC, PE' },
          { name: 'Thickness', value: '12-30 microns' },
          { name: 'Shrinkage Rate', value: '40-70%' },
          { name: 'Width', value: '200-800mm' },
          { name: 'Certifications', value: 'FDA, SGS, ROHS' },
        ]),
      },
      {
        name: 'Vacuum Freshness Pouch',
        slug: 'vacuum-freshness-pouch',
        categoryId: 5,
        shortDescription: 'Professional vacuum packaging solution to extend product shelf life',
        description: 'Vacuum freshness pouches are designed for products requiring long-term storage, effectively blocking oxygen and moisture, extending product shelf life by 3-5 times. Suitable for vacuum packaging of meat, seafood, cheese, nuts, and other foods.',
        features: JSON.stringify(['Excellent Oxygen Barrier', 'Superior Sealing', 'Puncture Resistant', 'Low Temperature Resistant', 'Customizable Printing']),
        specifications: JSON.stringify([
          { name: 'Material', value: 'PA/PE, PET/AL/PA/PE' },
          { name: 'Thickness', value: '80-180 microns' },
          { name: 'Oxygen Barrier Rate', value: '<1 cc/m²/day' },
          { name: 'Temperature Resistance', value: '-40°C to 121°C' },
          { name: 'Certifications', value: 'FDA, QS, HACCP' },
        ]),
      },
      {
        name: 'Liquid Spouted Pouch',
        slug: 'liquid-spouted-pouch',
        categoryId: 6,
        shortDescription: 'Spouted pouch design suitable for liquid product packaging',
        description: 'Liquid spouted pouches are innovative packaging solutions designed specifically for liquid products. Equipped with screw spouts or straw spouts for easy pouring and storage. Suitable for juices, beverages, seasonings, detergents, and other liquid products.',
        features: JSON.stringify(['Self-standing Design', 'Leak-proof Spout Design', 'Easy to Pour', 'Reusable', 'Portable and Lightweight']),
        specifications: JSON.stringify([
          { name: 'Material', value: 'PET/NY/PE, PET/AL/NY/PE' },
          { name: 'Capacity', value: '100ml-5L' },
          { name: 'Spout Diameter', value: '8.5mm-30mm' },
          { name: 'Spout Type', value: 'Screw Spout/Straw Spout' },
          { name: 'Certifications', value: 'FDA, QS, BRC' },
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

  // Initialize banners
  if (db.banners.length === 0) {
    const defaultBanners = [
      {
        title: 'Professional Plastic Packaging Solutions',
        subtitle: 'Quality Packaging, Trustworthy',
        description: '20 years of industry experience, providing the best packaging solutions for your products',
        image: '/images/banner-placeholder.svg',
        link: '/products',
        buttonText: 'View Products',
      },
      {
        title: 'Eco-friendly Biodegradable Materials',
        subtitle: 'Sustainable Development',
        description: 'We are committed to developing eco-friendly packaging materials to reduce environmental impact',
        image: '/images/banner-placeholder.svg',
        link: '/products/lay-flat-pouches',
        buttonText: 'Learn More',
      },
      {
        title: 'Customized Services',
        subtitle: 'Your Needs, Our Expertise',
        description: 'Providing comprehensive customization services from design to production',
        image: '/images/banner-placeholder.svg',
        link: '/contact',
        buttonText: 'Contact Us',
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
    // Home page content
    { page: 'home', section: 'header', key: 'logo', value: 'Plastic Packaging', image: '/images/logo-placeholder.svg' },
    { page: 'home', section: 'header', key: 'phone', value: '400-888-8888' },
    { page: 'home', section: 'header', key: 'email', value: 'info@packaging.com' },
    { page: 'home', section: 'about', key: 'title', value: 'About Us' },
    { page: 'home', section: 'about', key: 'description', value: 'We are a professional plastic packaging solutions provider with 20 years of industry experience, providing high-quality packaging products to global customers. We are committed to innovation and sustainable development, providing the best packaging solutions for your products.' },
    { page: 'home', section: 'about', key: 'image', value: '/images/about-placeholder.svg' },
    { page: 'home', section: 'features', key: 'title', value: 'Why Choose Us' },
    { page: 'home', section: 'features', key: 'feature1_title', value: 'Quality Assurance' },
    { page: 'home', section: 'features', key: 'feature1_desc', value: 'All products are ISO9001 quality certified, ensuring every product meets the highest standards' },
    { page: 'home', section: 'features', key: 'feature2_title', value: 'Customized Services' },
    { page: 'home', section: 'features', key: 'feature2_desc', value: 'Providing comprehensive customization services from design to production to meet your personalized needs' },
    { page: 'home', section: 'features', key: 'feature3_title', value: 'Fast Delivery' },
    { page: 'home', section: 'features', key: 'feature3_desc', value: 'Efficient production processes ensure on-time delivery, with support for urgent order processing' },
    { page: 'home', section: 'features', key: 'feature4_title', value: 'Eco-friendly Materials' },
    { page: 'home', section: 'features', key: 'feature4_desc', value: 'Using eco-friendly biodegradable materials to reduce environmental impact and practice sustainable development' },
    { page: 'home', section: 'cta', key: 'title', value: 'Start Your Packaging Project' },
    { page: 'home', section: 'cta', key: 'description', value: 'Contact us for free samples and quotes, our professional team will provide you with the best solutions' },
    { page: 'home', section: 'cta', key: 'button_text', value: 'Get Quote' },
    // Footer content
    { page: 'footer', section: 'company', key: 'name', value: 'Plastic Packaging Technology Co., Ltd.' },
    { page: 'footer', section: 'company', key: 'address', value: 'No. 88, Packaging Industrial Park, Pudong New Area, Shanghai, China' },
    { page: 'footer', section: 'company', key: 'phone', value: '400-888-8888' },
    { page: 'footer', section: 'company', key: 'email', value: 'info@packaging.com' },
    { page: 'footer', section: 'social', key: 'linkedin', value: 'linkedin.com/company/yourcompany' },
    { page: 'footer', section: 'social', key: 'facebook', value: 'facebook.com/yourpage' },
    { page: 'footer', section: 'social', key: 'instagram', value: '@yourhandle' },
    { page: 'footer', section: 'copyright', key: 'text', value: '© 2024 Plastic Packaging Technology Co., Ltd. All Rights Reserved' },
    // Industry page content
    { page: 'industries', section: 'hero', key: 'title', value: 'Industry Applications' },
    { page: 'industries', section: 'hero', key: 'subtitle', value: 'Providing professional packaging solutions for various industries' },
    { page: 'industries', section: 'intro', key: 'title', value: 'Professional Industry Solutions' },
    { page: 'industries', section: 'intro', key: 'description', value: 'We have extensive industry experience and deeply understand the packaging needs of different industries. Whether it is food preservation, pharmaceutical safety, or industrial protection, we can provide you with the most suitable packaging solutions.' },
    { page: 'industries', section: 'cta', key: 'title', value: 'Start Your Project' },
    { page: 'industries', section: 'cta', key: 'description', value: 'Contact us to get professional packaging solutions tailored to your industry' },
    // Industry page - Service industries section
    { page: 'industries', section: 'service_intro', key: 'title', value: 'Industries We Serve' },
    { page: 'industries', section: 'service_intro', key: 'subtitle', value: 'Our service areas' },
    // Industry page - Why choose us section
    { page: 'industries', section: 'why_choose', key: 'title', value: 'Why Choose Us' },
    { page: 'industries', section: 'why_choose', key: 'feature1_title', value: 'Industry Certifications' },
    { page: 'industries', section: 'why_choose', key: 'feature1_desc', value: 'Passed multiple international certifications including FDA and ISO' },
    { page: 'industries', section: 'why_choose', key: 'feature2_title', value: 'Custom R&D' },
    { page: 'industries', section: 'why_choose', key: 'feature2_desc', value: 'Custom packaging solutions tailored to industry characteristics' },
    { page: 'industries', section: 'why_choose', key: 'feature3_title', value: 'Fast Response' },
    { page: 'industries', section: 'why_choose', key: 'feature3_desc', value: 'Respond to customer needs within 24 hours' },
    { page: 'industries', section: 'why_choose', key: 'feature4_title', value: 'Global Service' },
    { page: 'industries', section: 'why_choose', key: 'feature4_desc', value: 'Products exported to more than 50 countries worldwide' },
    // Sustainability page content
    { page: 'sustainability', section: 'hero', key: 'title', value: 'Environmental Commitment' },
    { page: 'sustainability', section: 'hero', key: 'subtitle', value: 'Flexible Packaging and Environmental Sustainable Development' },
    { page: 'sustainability', section: 'intro', key: 'title', value: 'Our Environmental Philosophy' },
    { page: 'sustainability', section: 'intro', key: 'description', value: 'As a member of the packaging industry, we deeply understand the importance of environmental protection. We are committed to developing and promoting eco-friendly packaging materials, reducing the environmental impact of packaging through technological innovation, and creating a sustainable future for customers and the planet.' },
    { page: 'sustainability', section: 'intro', key: 'description2', value: 'We believe that quality packaging should not only protect products but also protect our planet. From material selection to production processes, we strive to be eco-friendly, energy-efficient, and sustainable in every step.' },
    { page: 'sustainability', section: 'intro', key: 'image', value: '/images/about-placeholder.svg' },
    { page: 'sustainability', section: 'cta', key: 'title', value: 'Choose Eco-friendly Packaging, Create a Better Future Together' },
    { page: 'sustainability', section: 'cta', key: 'description', value: 'Contact us to learn more about eco-friendly packaging solutions' },
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

// Helper functions for common operations (只读，用于 SSG)
export const dbHelpers = {
  // Products
  getAllProducts: () => {
    const db = getDatabaseContent();
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
    const db = getDatabaseContent();
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
    const db = getDatabaseContent();
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
    const db = getDatabaseContent();
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
    const db = getDatabaseContent();
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
    const db = getDatabaseContent();
    return db.siteContent;
  },

  getContent: (page?: string, section?: string, key?: string) => {
    const db = getDatabaseContent();
    let results = db.siteContent;
    if (page) results = results.filter((c) => c.page === page);
    if (section) results = results.filter((c) => c.section === section);
    if (key) results = results.filter((c) => c.key === key);
    return results;
  },

  saveContent: (page: string, section: string, key: string, value: string, image?: string) => {
    // 获取全局 db 对象并更新
    const currentDb = getDatabase();
    const existingIndex = currentDb.siteContent.findIndex((c) => c.page === page && c.section === section && c.key === key);
    if (existingIndex !== -1) {
      currentDb.siteContent[existingIndex] = {
        ...currentDb.siteContent[existingIndex],
        value: value,
        image: image !== undefined ? image : currentDb.siteContent[existingIndex].image,
        createdAt: currentDb.siteContent[existingIndex].createdAt,
      };
    } else {
      const newId = Math.max(...currentDb.siteContent.map((c) => c.id), 0) + 1;
      currentDb.siteContent.push({
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
    const db = getDatabaseContent();
    return db.users.find((u) => u.username === username) || null;
  },
};

export default getDatabase;
