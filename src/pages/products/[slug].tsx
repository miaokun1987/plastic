import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import path from 'path';
import fs from 'fs';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  main_image: string;
  category_name: string;
  category_slug: string;
}

interface Props {
  categories: Category[];
  products: Product[];
  currentCategory: string | null;
  content: { [key: string]: string };
}

export default function ProductsPage({ categories, products, currentCategory, content }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.short_description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Products - {content['header_logo'] || 'Plastic Packaging'}</title>
        <meta name="description" content="Professional plastic packaging products, including lay flat pouches, stand up pouches, zipper pouches, shrink film, vacuum pouches and more" />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Page Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            {currentCategory
              ? categories.find((c) => c.slug === currentCategory)?.name || 'Products'
              : 'Products'}
          </h1>
          <p className="text-xl opacity-90">
            {currentCategory
              ? categories.find((c) => c.slug === currentCategory)?.description
              : 'Explore our full range of packaging products'}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
                <nav className="space-y-2">
                  <Link
                    href="/products"
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      !currentCategory ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Products
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products/${category.slug}`}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        currentCategory === category.slug
                          ? 'bg-primary-100 text-primary-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>

                {/* Search */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Search Products</h3>
                  <input
                    type="text"
                    placeholder="Enter keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Need Customization?</h4>
                    <p className="text-sm text-gray-600 mb-4">Contact us for exclusive solutions</p>
                    <Link href="/contact" className="btn-primary w-full text-center block">
                      Contact Now
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No related products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/detail/${product.slug}`}
                      className="card group"
                    >
                      <div className="h-56 overflow-hidden bg-gray-100">
                        <img
                          src={product.main_image || '/images/product-placeholder.svg'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-sm text-primary-600">{product.category_name}</span>
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{product.short_description}</p>
                        <div className="mt-4 flex items-center text-primary-600">
                          <span>Learn More</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer content={content} />
    </>
  );
}

function Header({ content }: { content: { [key: string]: string } }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            {content['header_logo'] || 'Plastic Packaging'}
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link>
            <Link href="/products" className="text-primary-600 font-medium">Products</Link>
            <Link href="/industries" className="text-gray-700 hover:text-primary-600">Industries</Link>
            <Link href="/sustainability" className="text-gray-700 hover:text-primary-600">Sustainability</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">About Us</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">Contact Us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer({ content }: { content: { [key: string]: string } }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{content['company_name'] || 'Plastic Packaging Technology Co., Ltd.'}</h3>
            <div className="space-y-2 text-gray-400">
              <p>{content['company_address']}</p>
              <p>Phone: {content['company_phone']}</p>
              <p>Email: {content['company_email']}</p>
              {content['social_linkedin'] && <p>LinkedIn: {content['social_linkedin']}</p>}
              {content['social_facebook'] && <p>Facebook: {content['social_facebook']}</p>}
              {content['social_instagram'] && <p>Instagram: {content['social_instagram']}</p>}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
              <Link href="/products" className="text-gray-400 hover:text-white">Products</Link>
              <Link href="/industries" className="text-gray-400 hover:text-white">Industries</Link>
              <Link href="/sustainability" className="text-gray-400 hover:text-white">Sustainability</Link>
              <Link href="/about" className="text-gray-400 hover:text-white">About Us</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product Categories</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/products/lay-flat-pouches" className="text-gray-400 hover:text-white">Lay Flat Pouches</Link>
              <Link href="/products/stand-up-pouches" className="text-gray-400 hover:text-white">Stand Up Pouches</Link>
              <Link href="/products/zipper-pouches" className="text-gray-400 hover:text-white">Zipper Pouches</Link>
              <Link href="/products/shrink-film" className="text-gray-400 hover:text-white">Shrink Film</Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{content['copyright_text'] || '© 2024 Plastic Packaging Technology Co., Ltd. All Rights Reserved'}</p>
        </div>
      </div>
    </footer>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug?: string };
  const { dbHelpers } = await import('@/lib/db');

  // 获取所有分类
  const categories = dbHelpers.getAllCategories() as Category[];

  // 获取产品（按分类筛选）
  let products: Product[];
  const allProducts = dbHelpers.getAllProducts() as Product[];
  if (slug) {
    products = allProducts.filter((p) => p.category_slug === slug);
  } else {
    products = allProducts;
  }

  // 获取网站内容
  const contentRows = dbHelpers.getAllContent();
  const content: { [key: string]: string } = {};
  contentRows.forEach((row) => {
    // 对于 key 为 "image" 的记录，优先使用 image 字段的值
    if (row.key === 'image') {
      const imageUrl = row.image || row.value;
      if (imageUrl) {
        content[`${row.section}_${row.key}`] = imageUrl;
      }
    } else {
      content[`${row.section}_${row.key}`] = row.value || '';
    }
  });

  return {
    props: {
      categories,
      products,
      currentCategory: slug || null,
      content,
    },
    revalidate: process.env.NODE_ENV === 'production' ? 60 : 0,
  };
};

// 生成静态路径
export const getStaticPaths: GetStaticPaths = async () => {
  // 直接读取数据库文件
  const dbPath = path.join(process.cwd(), 'data', 'database.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const categories = db.categories || [];
  
  const paths = categories.map((category: { slug: string }) => ({
    params: { slug: category.slug }
  }));

  return {
    paths,
    fallback: 'blocking' // 允许动态生成缺失的页面
  };
};
