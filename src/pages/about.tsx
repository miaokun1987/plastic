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
        <title>{aboutData.title || 'About Us'} - {content['header_logo'] || 'Plastic Packaging'}</title>
        <meta name="description" content={aboutData.description1 || 'Learn about Plastic Packaging Technology Co., Ltd., a plastic packaging solutions provider with 20 years of industry experience'} />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Page Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{aboutData.title || 'About Us'}</h1>
          <p className="text-xl opacity-90">Professional Plastic Packaging Solutions Provider</p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Company Introduction</h2>
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
                alt="Factory Introduction"
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
            <h2 className="text-3xl font-bold mb-4">{aboutData.whyChooseUsTitle || 'Why Choose Us'}</h2>
            <p className="text-lg text-gray-600">{aboutData.whyChooseUsSubtitle || 'Our Advantages, Your Assurance'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏭',
                title: 'Advanced Equipment',
                desc: 'Import international advanced production equipment to ensure stable and reliable product quality'
              },
              {
                icon: '✅',
                title: 'Quality Certification',
                desc: 'Pass multiple international certifications such as ISO9001, ISO14001'
              },
              {
                icon: '💡',
                title: 'Innovation R&D',
                desc: 'Professional R&D team, continuously launching innovative packaging solutions'
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                desc: 'Efficient production process, supporting urgent order processing'
              },
              {
                icon: '🎨',
                title: 'Customized Services',
                desc: 'Provide comprehensive customized services from design to production'
              },
              {
                icon: '🌱',
                title: 'Eco-friendly Materials',
                desc: 'Use eco-friendly degradable materials, practicing sustainable development'
              },
              {
                icon: '🛡️',
                title: 'Quality Assurance',
                desc: 'Strict quality control system to ensure every product is qualified'
              },
              {
                icon: '🤝',
                title: 'Excellent Service',
                desc: 'Professional customer service team, providing full-process tracking services'
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
            <h2 className="text-3xl font-bold mb-4">{aboutData.certificationsTitle || 'Certifications'}</h2>
            <p className="text-lg text-gray-600">{aboutData.certificationsSubtitle || 'Professional Qualifications, Quality Assurance'}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['ISO9001', 'ISO14001', 'FDA', 'QS', 'SGS', 'BRC'].map((cert, index) => (
              <div key={index} className="bg-gray-100 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-primary-600 mb-2">{cert}</div>
                <p className="text-sm text-gray-500">Certified</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{aboutData.ctaTitle || 'Ready to Start Cooperation?'}</h2>
          <p className="text-xl mb-8 opacity-90">{aboutData.ctaDescription || 'Contact us to get free samples and professional advice'}</p>
          <Link href="/contact" className="btn-secondary">
            Contact Us
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
            {content['header_logo'] || 'Plastic Packaging'}
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600">Products</Link>
            <Link href="/industries" className="text-gray-700 hover:text-primary-600">Industries</Link>
            <Link href="/sustainability" className="text-gray-700 hover:text-primary-600">Sustainability</Link>
            <Link href="/about" className="text-primary-600 font-medium">About Us</Link>
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
              <Link href="/products/stand-up-pouches" className="text-gray-400 hover:text-white">Stand-up Pouches</Link>
              <Link href="/products/zipper-pouches" className="text-gray-400 hover:text-white">Zipper Pouches</Link>
              <Link href="/products/shrink-film" className="text-gray-400 hover:text-white">Shrink Film</Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{content['copyright_text'] || '© 2024 Plastic Packaging Technology Co., Ltd. All rights reserved'}</p>
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
    revalidate: process.env.NODE_ENV === 'production' ? 60 : 0,
  };
};
