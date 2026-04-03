import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface Props {
  content: { [key: string]: string };
}

export default function ContactPage({ content }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product_type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 在实际项目中，这里应该发送数据到后端API
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact Us - {content['header_logo'] || 'Plastic Packaging'}</title>
        <meta name="description" content="Contact Plastic Packaging Technology Co., Ltd. for packaging solutions and quotes" />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Page Header */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">We Look Forward to Working With You</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get a Quote</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-green-500 text-6xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Submitted Successfully!</h3>
                  <p className="text-green-600">Our staff will contact you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-primary-600 hover:text-primary-700"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                        placeholder="Please enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="input-field"
                        placeholder="Please enter company name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field"
                        placeholder="Please enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                        placeholder="Please enter your phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Type
                    </label>
                    <select
                      value={formData.product_type}
                      onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Please select product type</option>
                      <option value="lay-flat-pouches">Lay Flat Pouches</option>
                      <option value="stand-up-pouches">Stand-up Pouches</option>
                      <option value="zipper-pouches">Zipper Pouches</option>
                      <option value="shrink-film">Shrink Film</option>
                      <option value="vacuum-pouches">Vacuum Pouches</option>
                      <option value="spouted-pouches">Spouted Pouches</option>
                      <option value="custom">Custom Products</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detailed Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-field"
                      placeholder="Please describe your packaging requirements, such as size, material, quantity, etc..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Company Address</h3>
                      <p className="text-gray-600">{content['company_address'] || 'No. 88 Packaging Industrial Park, Pudong New District, Shanghai, China'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Number</h3>
                      <p className="text-gray-600">{content['header_phone'] || '400-888-8888'}</p>
                      <p className="text-sm text-gray-500 mt-1">Business Hours: Monday to Friday 9:00-18:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">{content['header_email'] || 'info@packaging.com'}</p>
                      <p className="text-sm text-gray-500 mt-1">We will reply within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Online Consultation</h3>
                      <p className="text-gray-600">WeChat: PackagingPro</p>
                      <p className="text-sm text-gray-500 mt-1">Scan to add WeChat for instant service</p>
                    </div>
                  </div>
                </div>
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
            {content['header_logo'] || 'Plastic Packaging'}
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600">Products</Link>
            <Link href="/industries" className="text-gray-700 hover:text-primary-600">Industries</Link>
            <Link href="/sustainability" className="text-gray-700 hover:text-primary-600">Sustainability</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">About Us</Link>
            <Link href="/contact" className="text-primary-600 font-medium">Contact Us</Link>
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
      content,
    },
    // ISR: 每 60 秒重新验证
    revalidate: process.env.NODE_ENV === 'production' ? 60 : 0,
  };
};
