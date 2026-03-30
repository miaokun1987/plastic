import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface Props {
  content: { [key: string]: string };
  aboutData: {
    title: string;
    description1: string;
    description2: string;
    description3: string;
    image: string;
    whyChooseUsTitle: string;
    whyChooseUsSubtitle: string;
    certificationsTitle: string;
    certificationsSubtitle: string;
    ctaTitle: string;
    ctaDescription: string;
  };
}

export default function AboutPage({ content, aboutData }: Props) {
  return (
    <>
      <Head>
        <title>{aboutData.title || '关于我们'} - {content['header_logo'] || '塑袋包装'}</title>
        <meta name="description" content={aboutData.description1 || '了解塑袋包装科技有限公司，20 年行业经验的塑料包装解决方案提供商'} />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Page Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{aboutData.title || '关于我们'}</h1>
          <p className="text-xl opacity-90">专业塑料包装解决方案提供商</p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">公司简介</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {aboutData.description1 || ''}
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {aboutData.description2 || ''}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {aboutData.description3 || ''}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={aboutData.image || '/images/about-placeholder.svg'}
                alt="工厂介绍"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{aboutData.whyChooseUsTitle || '为什么选择我们'}</h2>
            <p className="text-lg text-gray-600">{aboutData.whyChooseUsSubtitle || '我们的优势，是您的保障'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏭',
                title: '先进设备',
                desc: '引进国际先进生产设备，确保产品质量稳定可靠'
              },
              {
                icon: '✅',
                title: '品质认证',
                desc: '通过 ISO9001、ISO14001 等多项国际认证'
              },
              {
                icon: '💡',
                title: '创新研发',
                desc: '专业研发团队，持续推出创新包装解决方案'
              },
              {
                icon: '🚚',
                title: '快速交付',
                desc: '高效生产流程，支持紧急订单处理'
              },
              {
                icon: '🎨',
                title: '定制服务',
                desc: '提供从设计到生产的全方位定制服务'
              },
              {
                icon: '🌱',
                title: '环保材料',
                desc: '采用环保可降解材料，践行可持续发展'
              },
              {
                icon: '🛡️',
                title: '质量保证',
                desc: '严格的质量控制体系，确保每件产品合格'
              },
              {
                icon: '🤝',
                title: '优质服务',
                desc: '专业客服团队，全程跟踪服务'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{aboutData.certificationsTitle || '资质认证'}</h2>
            <p className="text-lg text-gray-600">{aboutData.certificationsSubtitle || '专业资质，品质保障'}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['ISO9001', 'ISO14001', 'FDA', 'QS', 'SGS', 'BRC'].map((cert, index) => (
              <div key={index} className="bg-gray-100 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-primary-600 mb-2">{cert}</div>
                <p className="text-sm text-gray-500">认证通过</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{aboutData.ctaTitle || '准备开始合作？'}</h2>
          <p className="text-xl mb-8 opacity-90">{aboutData.ctaDescription || '联系我们获取免费样品和专业建议'}</p>
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
            <Link href="/products" className="text-gray-700 hover:text-primary-600">产品中心</Link>
            <Link href="/industries" className="text-gray-700 hover:text-primary-600">行业</Link>
            <Link href="/sustainability" className="text-gray-700 hover:text-primary-600">环保</Link>
            <Link href="/about" className="text-primary-600 font-medium">关于我们</Link>
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
  const { dbHelpers } = await import('@/lib/db');

  // 获取网站内容
  const contentRows = dbHelpers.getAllContent();
  const content: { [key: string]: string } = {};
  contentRows.forEach((row) => {
    if (row.key === 'image') {
      const imageUrl = row.image || row.value;
      if (imageUrl) {
        content[`${row.section}_${row.key}`] = imageUrl;
      }
    } else {
      content[`${row.section}_${row.key}`] = row.value || '';
    }
  });

  // 获取 about 页面数据
  const aboutRows = contentRows.filter(row => row.page === 'about');
  const aboutData: any = {};
  aboutRows.forEach((row) => {
    if (row.key === 'image') {
      aboutData[row.key] = row.image || row.value;
    } else {
      aboutData[row.key] = row.value || '';
    }
  });

  return {
    props: {
      content,
      aboutData,
    },
    revalidate: 60,
  };
};
