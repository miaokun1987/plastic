import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

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
  content: { [key: string]: string };
}

export default function AllProductsPage({ categories, products, content }: Props) {
  return (
    <>
      <Head>
        <title>产品中心 - {content['header_logo'] || '塑袋包装'}</title>
        <meta name="description" content="专业塑料包装产品，包括平口袋、站立袋、拉链袋、收缩膜、真空袋等" />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Page Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">产品中心</h1>
          <p className="text-xl opacity-90">探索我们的全系列包装产品</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">产品分类</h3>
                <nav className="space-y-2">
                  <Link
                    href="/products"
                    className="block px-4 py-2 rounded-lg bg-primary-100 text-primary-600"
                  >
                    全部产品
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products/${category.slug}`}
                      className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">需要定制?</h4>
                    <p className="text-sm text-gray-600 mb-4">联系我们获取专属解决方案</p>
                    <Link href="/contact" className="btn-primary w-full text-center block">
                      立即咨询
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
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
                        <span>了解更多</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
            {content['header_logo'] || '塑袋包装'}
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">首页</Link>
            <Link href="/products" className="text-primary-600 font-medium">产品中心</Link>
            <Link href="/industries" className="text-gray-700 hover:text-primary-600">行业</Link>
            <Link href="/sustainability" className="text-gray-700 hover:text-primary-600">环保</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">关于我们</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">联系我们</Link>
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
            <h3 className="text-xl font-bold mb-4">{content['company_name'] || '塑袋包装科技有限公司'}</h3>
            <div className="space-y-2 text-gray-400">
              <p>{content['company_address']}</p>
              <p>电话: {content['company_phone']}</p>
              <p>邮箱: {content['company_email']}</p>
              {content['social_linkedin'] && <p>LinkedIn: {content['social_linkedin']}</p>}
              {content['social_facebook'] && <p>Facebook: {content['social_facebook']}</p>}
              {content['social_instagram'] && <p>Instagram: {content['social_instagram']}</p>}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-gray-400 hover:text-white">首页</Link>
              <Link href="/products" className="text-gray-400 hover:text-white">产品中心</Link>
              <Link href="/industries" className="text-gray-400 hover:text-white">行业</Link>
              <Link href="/sustainability" className="text-gray-400 hover:text-white">环保</Link>
              <Link href="/about" className="text-gray-400 hover:text-white">关于我们</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">联系我们</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">产品分类</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/products/lay-flat-pouches" className="text-gray-400 hover:text-white">平口袋</Link>
              <Link href="/products/stand-up-pouches" className="text-gray-400 hover:text-white">站立袋</Link>
              <Link href="/products/zipper-pouches" className="text-gray-400 hover:text-white">拉链袋</Link>
              <Link href="/products/shrink-film" className="text-gray-400 hover:text-white">收缩膜</Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{content['copyright_text'] || '© 2024 塑袋包装科技有限公司 版权所有'}</p>
        </div>
      </div>
    </footer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { dbHelpers } = await import('@/lib/db');

  // 获取所有分类
  const categories = dbHelpers.getAllCategories() as Category[];

  // 获取所有产品
  const products = dbHelpers.getAllProducts() as Product[];

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
      content,
    },
    // ISR: 每 60 秒重新验证
    revalidate: 60,
  };
};
