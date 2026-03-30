import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { dbHelpers } from '@/lib/db';
import { useState } from 'react';

interface Content {
  [key: string]: string;
}

interface Industry {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface Props {
  content: Content;
  industries: Industry[];
}

export default function IndustriesPage({ content, industries }: Props) {
  return (
    <>
      <Head>
        <title>行业应用 - {content['header_logo'] || '塑袋包装'}</title>
        <meta name="description" content="我们为食品、饮料、医药、化工等多个行业提供专业的包装解决方案" />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content['industries_hero_title'] || '行业应用'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
              {content['industries_hero_subtitle'] || '为各行各业提供专业包装解决方案'}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              {content['industries_intro_title'] || '专业行业解决方案'}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content['industries_intro_description'] ||
                '我们拥有丰富的行业经验，深入了解不同行业的包装需求。无论是食品保鲜、医药安全还是工业防护，我们都能为您提供最适合的包装方案。'}
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">{content['industries_service_intro_title'] || '服务行业'}</h2>
            <p className="section-subtitle">{content['industries_service_intro_subtitle'] || '我们服务的行业领域'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={industry.image || '/images/category-placeholder.svg'}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{industry.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{industry.description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    了解更多
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">{content['industries_why_choose_title'] || '为什么选择我们'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">行业认证</h3>
              <p className="text-gray-600">通过 FDA、ISO 等多项国际认证</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">定制研发</h3>
              <p className="text-gray-600">针对行业特点定制包装方案</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">快速响应</h3>
              <p className="text-gray-600">24 小时内响应客户需求</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">全球服务</h3>
              <p className="text-gray-600">产品远销全球 50 多个国家</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content['industries_cta_title'] || '开始您的项目'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {content['industries_cta_description'] || '联系我们，获取针对您行业的专业包装方案'}
          </p>
          <Link href="/contact" className="btn-secondary">
            联系我们
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
            <Link href="/industries" className="text-primary-600 font-medium">
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
              <Link href="/industries" className="text-primary-600 font-medium">行业</Link>
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
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{content['company_name'] || '塑袋包装科技有限公司'}</h3>
            <div className="space-y-2 text-gray-400">
              <p>{content['company_address']}</p>
              <p>电话：{content['company_phone']}</p>
              <p>邮箱：{content['company_email']}</p>
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
  // 获取行业数据
  const industries = dbHelpers.getAllIndustries();
  
  // 获取网站内容
  const contentRows = dbHelpers.getAllContent();
  const content: Content = {};
  contentRows.forEach((row) => {
    // 对于 key 为 "image" 的记录，优先使用 image 字段的值
    if (row.key === 'image') {
      const imageUrl = row.image || row.value;
      if (imageUrl) {
        content[`${row.page}_${row.section}_${row.key}`] = imageUrl;
        content[`${row.section}_${row.key}`] = imageUrl;
      }
    } else {
      // 其他 key 正常处理
      if (row.value) {
        content[`${row.page}_${row.section}_${row.key}`] = row.value;
        content[`${row.section}_${row.key}`] = row.value;
      }
    }
    // 同时保留 _image 后缀的 key 用于兼容
    if (row.image) {
      content[`${row.page}_${row.section}_${row.key}_image`] = row.image;
      content[`${row.section}_${row.key}_image`] = row.image;
    }
  });

  return {
    props: {
      content,
      industries,
    },
    // ISR: 每 60 秒重新验证
    revalidate: 60,
  };
};
