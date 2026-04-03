import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { dbHelpers } from '@/lib/db';

interface Content {
  [key: string]: string;
}

interface Props {
  content: Content;
}

export default function SustainabilityPage({ content }: Props) {
  return (
    <>
      <Head>
        <title>Sustainability - {content['header_logo'] || 'Plastic Packaging'}</title>
        <meta name="description" content="We are committed to sustainable development, providing eco-friendly packaging solutions and reducing environmental impact" />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden bg-gradient-to-r from-green-600 to-green-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content['sustainability_hero_title'] || 'Sustainability'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
              {content['sustainability_hero_subtitle'] || 'Flexible Packaging and Environmental Sustainability'}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {content['sustainability_intro_title'] || 'Our Environmental Philosophy'}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {content['sustainability_intro_description'] ||
                  'As a member of the packaging industry, we deeply understand the importance of environmental protection. We are committed to developing and promoting eco-friendly packaging materials, reducing the environmental impact of packaging through technological innovation, and creating a sustainable future for customers and the planet.'}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {content['sustainability_intro_description2'] ||
                  'We believe that high-quality packaging should not only protect products but also protect our planet. From material selection to production processes, we strive to be eco-friendly, energy-efficient, and sustainable in every step.'}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={content['sustainability_intro_image'] || '/images/about-placeholder.svg'}
                alt="Environmental Philosophy"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Sustainable Packaging */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Sustainable Packaging</h2>
            <p className="section-subtitle">Five Advantages of Eco-friendly Packaging</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Recyclable</h3>
              <p className="text-gray-600 text-center">Single-material design for easy recycling and reuse, reducing resource waste</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Reduced Carbon Footprint</h3>
              <p className="text-gray-600 text-center">Lightweight design reduces transportation energy consumption and carbon dioxide emissions</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Material Innovation</h3>
              <p className="text-gray-600 text-center">Bio-based materials and water-based inks reduce dependence on petroleum resources</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Food Freshness</h3>
              <p className="text-gray-600 text-center">Excellent barrier properties extend food shelf life and reduce food waste</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Cost Efficiency</h3>
              <p className="text-gray-600 text-center">Reduce material usage, lowering packaging costs and storage space</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Consumer Recognition</h3>
              <p className="text-gray-600 text-center">Meet consumer demand for eco-friendly products and enhance brand image</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Environmental Commitment</h2>
            <p className="section-subtitle">Contributing to Sustainable Development</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-green-800">Material Selection</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Promote single-material packaging for easy recycling</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Develop bio-based and biodegradable materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Use water-based inks to reduce VOC emissions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Use recycled materials to achieve circular utilization</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Production Process</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Optimize production processes to reduce energy consumption</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Reduce production waste and improve material utilization</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Use clean energy to reduce carbon emissions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Establish waste recycling and treatment systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Environmental Comparison</h2>
            <p className="section-subtitle">Environmental Impact Comparison: Flexible Packaging vs Traditional Packaging</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Comparison Item</th>
                    <th className="px-6 py-4 text-center">Flexible Packaging</th>
                    <th className="px-6 py-4 text-center">Traditional Rigid Packaging</th>
                    <th className="px-6 py-4 text-center">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-6 py-4 font-medium">Material Usage</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">Less</td>
                    <td className="px-6 py-4 text-center text-gray-500">More</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">80% Reduction</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Transportation Energy</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">Low</td>
                    <td className="px-6 py-4 text-center text-gray-500">High</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">60% Reduction</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Storage Space</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">Small</td>
                    <td className="px-6 py-4 text-center text-gray-500">Large</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">75% Savings</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Carbon Footprint</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">Low</td>
                    <td className="px-6 py-4 text-center text-gray-500">High</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">70% Reduction</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Product to Packaging Ratio</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">97:3</td>
                    <td className="px-6 py-4 text-center text-gray-500">85:15</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">More Efficient</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Environmental Certifications</h2>
            <p className="section-subtitle">Environmental Certifications We Have Obtained</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <span className="text-2xl font-bold text-green-600">ISO</span>
              </div>
              <h3 className="font-semibold text-gray-800">ISO 14001</h3>
              <p className="text-sm text-gray-500">Environmental Management System</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <span className="text-2xl font-bold text-green-600">FDA</span>
              </div>
              <h3 className="font-semibold text-gray-800">FDA Certification</h3>
              <p className="text-sm text-gray-500">Food Safety Standards</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <span className="text-2xl font-bold text-green-600">FSC</span>
              </div>
              <h3 className="font-semibold text-gray-800">FSC Certification</h3>
              <p className="text-sm text-gray-500">Forest Stewardship Council</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <span className="text-2xl font-bold text-green-600">OK</span>
              </div>
              <h3 className="font-semibold text-gray-800">OK Compost</h3>
              <p className="text-sm text-gray-500">Compostable Certification</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content['sustainability_cta_title'] || 'Choose Eco-friendly Packaging, Create a Better Future Together'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {content['sustainability_cta_description'] || 'Contact us to learn more about eco-friendly packaging solutions'}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="btn-secondary bg-white text-green-600 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-green-600">
              View Products
            </Link>
          </div>
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
            {content['header_logo'] || 'Plastic Packaging'}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600">
              Products
            </Link>
            <Link href="/industries" className="text-gray-700 hover:text-primary-600">
              Industries
            </Link>
            <Link href="/sustainability" className="text-green-600 font-medium">
              Sustainability
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">
              Contact Us
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
              <Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-primary-600">Products</Link>
              <Link href="/industries" className="text-gray-700 hover:text-primary-600">Industries</Link>
              <Link href="/sustainability" className="text-green-600 font-medium">Sustainability</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600">About Us</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-600">Contact Us</Link>
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

import { useState } from 'react';

export const getStaticProps: GetStaticProps = async () => {
  const contentRows = dbHelpers.getAllContent();
  const content: Content = {};
  contentRows.forEach((row) => {
    // 对于 key 为 "image" 的记录，优先使用 image 字段的值
    if (row.key === 'image') {
      // 如果有 image 字段，使用它；否则使用 value 字段
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
    },
    // ISR: 每 60 秒重新验证
    revalidate: process.env.NODE_ENV === 'production' ? 60 : 0,
  };
};
