import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState } from 'react';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  button_text: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  main_image: string;
  category_name: string;
  is_featured: number;
}

interface Content {
  [key: string]: string;
}

interface Props {
  banners: Banner[];
  categories: Category[];
  featuredProducts: Product[];
  content: Content;
}

export default function Home({ banners, categories, featuredProducts, content }: Props) {
  return (
    <>
      <Head>
        <title>{content['header_logo'] || '塑袋包装'} - 专业塑料包装解决方案</title>
        <meta name="description" content="专业塑料包装制造商，提供平口袋、站立袋、拉链袋、收缩膜等包装产品" />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Hero Banner */}
      <section className="relative h-[600px] overflow-hidden">
        {banners.length > 0 && (
          <div className="absolute inset-0">
            <img
              src={banners[0].image || '/images/banner-placeholder.svg'}
              alt={banners[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            {banners.length > 0 && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{banners[0].title}</h1>
                <p className="text-xl md:text-2xl mb-8">{banners[0].subtitle}</p>
                <p className="text-lg mb-8 max-w-2xl">{banners[0].description}</p>
                <Link href={banners[0].link || '/products'} className="btn-secondary">
                  {banners[0].button_text || '了解更多'}
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">产品分类</h2>
            <p className="section-subtitle">我们提供多种类型的塑料包装解决方案</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="card group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image || '/images/category-placeholder.svg'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">推荐产品</h2>
            <p className="section-subtitle">精选优质包装产品，满足您的各种需求</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/detail/${product.slug}`}
                className="card group"
              >
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.main_image || '/images/product-placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary-600">{product.category_name}</span>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 line-clamp-2">{product.short_description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products" className="btn-outline">
              查看所有产品
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">{content['about_title'] || '关于我们'}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {content['about_description'] || '我们是专业的塑料包装解决方案提供商...'}
              </p>
              <Link href="/about" className="btn-primary">
                了解更多
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={content['about_image'] || '/images/about-placeholder.svg'}
                alt="关于我们"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">{content['features_title'] || '为什么选择我们'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: content['features_feature1_title'], desc: content['features_feature1_desc'], icon: '✓' },
              { title: content['features_feature2_title'], desc: content['features_feature2_desc'], icon: '✓' },
              { title: content['features_feature3_title'], desc: content['features_feature3_desc'], icon: '✓' },
              { title: content['features_feature4_title'], desc: content['features_feature4_desc'], icon: '✓' },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl text-primary-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content['cta_title'] || '开始您的包装项目'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {content['cta_description'] || '联系我们获取免费样品和报价'}
          </p>
          <Link href="/contact" className="btn-secondary">
            {content['cta_button_text'] || '获取报价'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer content={content} />
    </>
  );
}

function Header({ content }: { content: Content }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            {content['header_logo'] || '塑袋包装'}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">
              首页
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600">
              产品中心
            </Link>
            <Link href="/industries" className="text-gray-700 hover:text-primary-600">
              行业
            </Link>
            <Link href="/sustainability" className="text-gray-700 hover:text-primary-600">
              环保
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">
              关于我们
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">
              联系我们
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600">首页</Link>
              <Link href="/products" className="text-gray-700 hover:text-primary-600">产品中心</Link>
              <Link href="/industries" className="text-gray-700 hover:text-primary-600">行业</Link>
              <Link href="/sustainability" className="text-gray-700 hover:text-primary-600">环保</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600">关于我们</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-600">联系我们</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function Footer({ content }: { content: Content }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
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

          {/* Quick Links */}
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

          {/* Products */}
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

// ISR: 每 60 秒重新生成页面
export const getStaticProps: GetStaticProps = async () => {
  const { dbHelpers } = await import('@/lib/db');

  // 获取轮播图
  const allBanners = dbHelpers.getAllBanners();
  const banners = allBanners.filter((b) => b.is_active).slice(0, 3) as Banner[];

  // 获取分类
  const categories = dbHelpers.getAllCategories() as Category[];

  // 获取推荐产品
  const allProducts = dbHelpers.getAllProducts();
  let featuredProducts = allProducts.filter((p) => p.is_featured) as Product[];

  // 如果推荐产品不足，获取普通产品
  if (featuredProducts.length < 6) {
    const additional = allProducts
      .filter((p) => !p.is_featured)
      .slice(0, 6 - featuredProducts.length) as Product[];
    featuredProducts = [...featuredProducts, ...additional];
  }

  // 获取网站内容
  const contentRows = dbHelpers.getAllContent();
  const content: Content = {};
  contentRows.forEach((row) => {
    // 对于 key 为 "image" 的记录，优先使用 image 字段的值
    if (row.key === 'image') {
      const imageUrl = row.image || row.value;
      if (imageUrl) {
        content[`${row.section}_${row.key}`] = imageUrl;
      }
    } else {
      // 其他 key 正常处理
      if (row.value) {
        content[`${row.section}_${row.key}`] = row.value;
      }
    }
    // 同时保留 _image 后缀的 key 用于兼容
    if (row.image) {
      content[`${row.section}_${row.key}_image`] = row.image;
    }
  });

  return {
    props: {
      banners,
      categories,
      featuredProducts,
      content,
    },
    // 开发环境下不使用 ISR，每次请求都重新获取数据
    // 生产环境下每 60 秒重新验证并重新生成页面
    revalidate: process.env.NODE_ENV === 'production' ? 60 : 0,
  };
};
