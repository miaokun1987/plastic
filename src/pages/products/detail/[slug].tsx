import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import path from 'path';
import fs from 'fs';

interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number | null;
  short_description: string;
  description: string;
  features: string;
  specifications: string;
  main_image: string;
  images: string;
  diagram_image: string;
  diagram_description: string;
  meta_title: string;
  meta_description: string;
  category_name: string;
  category_slug: string;
}

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  category_name: string;
}

interface Props {
  product: Product;
  relatedProducts: RelatedProduct[];
  content: { [key: string]: string };
}

export default function ProductDetailPage({ product, relatedProducts, content }: Props) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'diagram'>('description');
  const features = product.features ? JSON.parse(product.features) : [];
  const specifications = product.specifications ? JSON.parse(product.specifications) : [];
  const additionalImages = product.images ? JSON.parse(product.images) : [];

  return (
    <>
      <Head>
        <title>{product.meta_title || product.name} - {content['header_logo'] || 'Plastic Packaging'}</title>
        <meta name="description" content={product.meta_description || product.short_description} />
      </Head>

      {/* Header */}
      <Header content={content} />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            <span className="text-gray-400">/</span>
            {product.category_slug && (
              <>
                <Link href={`/products/${product.category_slug}`} className="text-gray-500 hover:text-primary-600">
                  {product.category_name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img
                  src={product.main_image || '/images/product-placeholder.svg'}
                  alt={product.name}
                  className="w-full h-96 object-contain"
                />
              </div>
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {additionalImages.map((img: string, index: number) => (
                    <div key={index} className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-500">
                      <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <Link href={`/products/${product.category_slug}`} className="text-primary-600 hover:text-primary-700">
                  {product.category_name}
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-6">{product.short_description}</p>

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/contact" className="btn-primary">
                  Get Quote
                </Link>
                <Link href="/contact" className="btn-outline">
                  Download Product Materials
                </Link>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{content['header_phone'] || '400-888-8888'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{content['header_email'] || 'info@packaging.com'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex gap-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 border-b-2 font-medium transition-colors ${
                    activeTab === 'description'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Product Description
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`py-4 border-b-2 font-medium transition-colors ${
                    activeTab === 'specs'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab('diagram')}
                  className={`py-4 border-b-2 font-medium transition-colors ${
                    activeTab === 'diagram'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Product Diagram
                </button>
              </nav>
            </div>
            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {activeTab === 'specs' && (
                <>
                  {specifications.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                      <div className="bg-gray-50 rounded-xl overflow-hidden">
                        <table className="w-full">
                          <tbody className="divide-y divide-gray-200">
                            {specifications.map((spec: { name: string; value: string }, index: number) => (
                              <tr key={index}>
                                <td className="px-6 py-4 font-medium text-gray-900 w-1/3 bg-gray-100">{spec.name}</td>
                                <td className="px-6 py-4 text-gray-600">{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No technical specifications available
                    </div>
                  )}
                </>
              )}

              {activeTab === 'diagram' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Product Diagram</h3>

                  {/* 产品示意图描述 */}
                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-600 leading-relaxed">
                      {product.diagram_description || 'This product is made from high-quality raw materials with excellent sealing performance and durability. The product structure is reasonably designed and suitable for various packaging scenarios. The diagram below shows the main structural parameters and size specifications of the product. You can choose the appropriate specifications according to your actual needs. If you need custom specifications, please contact our customer service team.'}
                    </p>
                  </div>

                  {/* 产品示意图图片 */}
                  {product.diagram_image ? (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <img
                        src={product.diagram_image}
                        alt={`${product.name} Product Diagram`}
                        className="w-full max-w-2xl mx-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <img
                        src="/images/product-diagram-placeholder.svg"
                        alt="Product Diagram"
                        className="w-full max-w-2xl mx-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/detail/${relatedProduct.slug}`}
                  className="card group"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={relatedProduct.main_image || '/images/product-placeholder.svg'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-sm text-primary-600">{relatedProduct.category_name}</span>
                    <h3 className="font-semibold">{relatedProduct.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const { dbHelpers } = await import('@/lib/db');

  // 获取产品详情
  const product = dbHelpers.getProductBySlug(slug) as Product | null;

  if (!product) {
    return { notFound: true };
  }

  // 获取相关产品（同分类其他产品）
  const allProducts = dbHelpers.getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      main_image: p.main_image,
      category_name: p.category_name,
    })) as RelatedProduct[];

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
      product,
      relatedProducts,
      content,
    },
    // ISR: 每 60 秒重新验证
    revalidate: process.env.NODE_ENV === 'production' ? 60 : 0,
  };
};

// 生成静态路径
export const getStaticPaths: GetStaticPaths = async () => {
  // 直接读取数据库文件
  const dbPath = path.join(process.cwd(), 'data', 'database.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const products = db.products || [];
  
  const paths = products.map((product: { slug: string }) => ({
    params: { slug: product.slug }
  }));

  return {
    paths,
    fallback: 'blocking' // 允许动态生成缺失的页面
  };
};
