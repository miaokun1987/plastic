import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

interface User {
  id: number;
  username: string;
}

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

function AdminSidebar({ user, activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'categories', label: 'Categories', icon: '📁' },
    { id: 'industries', label: 'Industries', icon: '🏭' },
    { id: 'banners', label: 'Banners', icon: '🖼️' },
    { id: 'content', label: 'Website Content', icon: '📝' },
  ];

  return (
    <div className="admin-sidebar">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Plastic Packaging</h1>
        <p className="text-gray-400 text-sm">Admin Dashboard</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="border-t border-gray-700 pt-4 mb-4">
          <p className="text-gray-400 text-sm">Current User: {user.username}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            View Website
          </Link>
          <button
            onClick={onLogout}
            className="text-left text-red-400 hover:text-red-300 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      router.push('/admin/login');
      return;
    }

    // 验证token
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.valid) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/admin/login');
          return;
        }
        setUser(JSON.parse(userStr));
        setLoading(false);
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Plastic Packaging</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <AdminSidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />

        <div className="ml-64 p-8">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'products' && <ProductsManager />}
          {activeTab === 'categories' && <CategoriesManager />}
          {activeTab === 'industries' && <IndustriesManager />}
          {activeTab === 'banners' && <BannersManager />}
          {activeTab === 'content' && <ContentManager />}
        </div>
      </div>
    </>
  );
}

function DashboardContent() {
  const [stats, setStats] = useState({ products: 0, categories: 0, banners: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes, bannersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/products/categories'),
          fetch('/api/content/banners'),
        ]);
        const products = await productsRes.json();
        const categories = await categoriesRes.json();
        const banners = await bannersRes.json();
        setStats({
          products: products.length,
          categories: categories.length,
          banners: banners.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.products, color: 'bg-blue-500' },
    { label: 'Total Categories', value: stats.categories, color: 'bg-green-500' },
    { label: 'Banners', value: stats.banners, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
              {stat.value}
            </div>
            <p className="text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-4">Image Specifications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Image Type</th>
                <th className="px-4 py-3 text-left">Recommended Size</th>
                <th className="px-4 py-3 text-left">Format</th>
                <th className="px-4 py-3 text-left">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3">Logo</td>
                <td className="px-4 py-3">200 x 60 px</td>
                <td className="px-4 py-3">PNG/JPEG</td>
                <td className="px-4 py-3">Website Header Logo</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Banner/Carousel</td>
                <td className="px-4 py-3">1920 x 600 px</td>
                <td className="px-4 py-3">JPEG</td>
                <td className="px-4 py-3">Homepage Carousel</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Product Main Image</td>
                <td className="px-4 py-3">800 x 800 px</td>
                <td className="px-4 py-3">JPEG</td>
                <td className="px-4 py-3">Product List and Detail Pages</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Category Image</td>
                <td className="px-4 py-3">400 x 300 px</td>
                <td className="px-4 py-3">JPEG</td>
                <td className="px-4 py-3">Category Display Image</td>
              </tr>
              <tr>
                <td className="px-4 py-3">About Us Image</td>
                <td className="px-4 py-3">600 x 400 px</td>
                <td className="px-4 py-3">JPEG</td>
                <td className="px-4 py-3">Homepage About Us Section</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductsManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    short_description: '',
    description: '',
    features: '',
    specifications: '',
    main_image: '',
    images: '',
    diagram_image: '',
    diagram_description: '',
    meta_title: '',
    meta_description: '',
    is_featured: false,
    sort_order: 0,
  });
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/products/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = editingProduct
        ? await fetch(`/api/products/${editingProduct.slug}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          })
        : await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });

      if (res.ok) {
        setSaveMessage(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
        setShowForm(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts();
      } else {
        const errorData = await res.json();
        setSaveMessage(`Save failed: ${errorData.error || 'Unknown error'}`);
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      setSaveMessage('Save failed, please check network connection');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleEdit = async (slug: string) => {
    const product = products.find((p) => p.slug === slug);
    if (!product) return;

    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      category_id: product.category_id || '',
      short_description: product.short_description || '',
      description: product.description || '',
      features: product.features || '',
      specifications: product.specifications || '',
      main_image: product.main_image || '',
      images: product.images || '',
      diagram_image: product.diagram_image || '',
      diagram_description: product.diagram_description || '',
      meta_title: product.meta_title || '',
      meta_description: product.meta_description || '',
      is_featured: !!product.is_featured,
      sort_order: product.sort_order || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/products/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      category_id: '',
      short_description: '',
      description: '',
      features: '',
      specifications: '',
      main_image: '',
      images: '',
      diagram_image: '',
      diagram_description: '',
      meta_title: '',
      meta_description: '',
      is_featured: false,
      sort_order: 0,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      setFormData({ ...formData, main_image: data.url });
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleDiagramImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      setFormData({ ...formData, diagram_image: data.url });
    } catch (error) {
      console.error('Failed to upload diagram image:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => {
            resetForm();
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: name
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-\u4e00-\u9fa5]+/g, ''),
                    });
                  }}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Alias *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="input-field"
                >
                  <option value="">Please select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features (JSON array format)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  className="input-field font-mono text-sm"
                  placeholder='["Feature 1", "Feature 2"]'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specifications (JSON array format)
                </label>
                <textarea
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                  rows={3}
                  className="input-field font-mono text-sm"
                  placeholder='[{"name":"Material","value":"PET/PE"}]'
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Main Image (Recommended: 800 x 800 px, JPEG)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                {formData.main_image && (
                  <img
                    src={formData.main_image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Diagram Image (Recommended: 800 x 500 px, JPEG)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDiagramImageUpload}
                  className="flex-1"
                />
                {formData.diagram_image && (
                  <img
                    src={formData.diagram_image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Diagram Description
              </label>
              <textarea
                value={formData.diagram_description}
                onChange={(e) => setFormData({ ...formData, diagram_description: e.target.value })}
                rows={3}
                className="input-field"
                placeholder="Enter description for product diagram..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  className="input-field"
                  placeholder="For search engine optimization"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Description
                </label>
                <input
                  type="text"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  className="input-field"
                  placeholder="For search engine optimization"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              />
              <label htmlFor="is_featured" className="text-sm text-gray-700">
                Mark as Featured Product
              </label>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
            {saveMessage && (
              <div className={`mt-4 p-3 rounded ${saveMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {saveMessage}
              </div>
            )}
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Sort Order</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  {product.main_image ? (
                    <img
                      src={product.main_image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.slug}</div>
                </td>
                <td className="px-4 py-3">{product.category_name || '-'}</td>
                <td className="px-4 py-3">{product.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.slug)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoriesManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    sort_order: 0,
  });
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/products/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = editingCategory
        ? await fetch(`/api/products/categories/${editingCategory.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          })
        : await fetch('/api/products/categories', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });

      if (res.ok) {
        setSaveMessage(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
        setShowForm(false);
        setEditingCategory(null);
        resetForm();
        fetchCategories();
      } else {
        const errorData = await res.json();
        setSaveMessage(`Save failed: ${errorData.error || 'Unknown error'}`);
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      setSaveMessage('Save failed, please check network connection');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image: category.image || '',
      sort_order: category.sort_order || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category? Deleting a category will not delete the products under it.')) return;

    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/products/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      sort_order: 0,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      setFormData({ ...formData, image: data.url });
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <button
          onClick={() => {
            resetForm();
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingCategory ? 'Edit Category' : 'Add Category'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: name
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-\u4e00-\u9fa5]+/g, ''),
                    });
                  }}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Alias *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Image (Recommended: 400 x 300 px, JPEG)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                className="input-field"
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary">
                {editingCategory ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                }}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
            {saveMessage && (
              <div className={`mt-4 p-3 rounded ${saveMessage.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {saveMessage}
              </div>
            )}
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Alias</th>
              <th className="px-4 py-3 text-left">Sort Order</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-3">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{category.name}</td>
                <td className="px-4 py-3 text-gray-500">{category.slug}</td>
                <td className="px-4 py-3">{category.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IndustriesManager() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    sort_order: 0,
  });
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const res = await fetch('/api/industries');
      const data = await res.json();
      setIndustries(data);
    } catch (error) {
      console.error('Failed to fetch industries:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = editingIndustry
        ? await fetch(`/api/industries/${editingIndustry.slug}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...formData, id: editingIndustry.id }),
          })
        : await fetch('/api/industries', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });

      if (res.ok) {
        setSaveMessage(editingIndustry ? 'Industry updated successfully!' : 'Industry created successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
        setShowForm(false);
        setEditingIndustry(null);
        resetForm();
        fetchIndustries();
      } else {
        const errorData = await res.json();
        setSaveMessage(`Save failed: ${errorData.error || 'Unknown error'}`);
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (error) {
      console.error('Failed to save industry:', error);
      setSaveMessage('Save failed, please check network connection');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleEdit = (industry: any) => {
    setEditingIndustry(industry);
    setFormData({
      name: industry.name,
      slug: industry.slug,
      description: industry.description || '',
      image: industry.image || '',
      sort_order: industry.sort_order || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this industry?')) return;

    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/industries/${id}?_method=DELETE`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIndustries();
    } catch (error) {
      console.error('Failed to delete industry:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      sort_order: 0,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      setFormData({ ...formData, image: data.url });
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Industry Management</h2>
        <button
          onClick={() => {
            resetForm();
            setEditingIndustry(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + Add Industry
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingIndustry ? 'Edit Industry' : 'Add Industry'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: name
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-\u4e00-\u9fa5]+/g, ''),
                    });
                  }}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Alias *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry Image (Recommended: 400 x 300 px, JPEG/SVG)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                className="input-field"
              />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary">
                {editingIndustry ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingIndustry(null);
                }}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
            {saveMessage && (
              <div className={`mt-4 p-3 rounded ${saveMessage.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {saveMessage}
              </div>
            )}
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Alias</th>
              <th className="px-4 py-3 text-left">Sort Order</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {industries.map((industry) => (
              <tr key={industry.id}>
                <td className="px-4 py-3">
                  {industry.image ? (
                    <img src={industry.image} alt={industry.name} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{industry.name}</td>
                <td className="px-4 py-3 text-gray-500">{industry.slug}</td>
                <td className="px-4 py-3">{industry.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(industry)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(industry.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BannersManager() {
  const [banners, setBanners] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    link: '',
    button_text: '',
    sort_order: 0,
    is_active: true,
  });
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/content/banners');
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = editingBanner
        ? await fetch(`/api/content/banners/${editingBanner.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          })
        : await fetch('/api/content/banners', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });

      if (res.ok) {
        setSaveMessage(editingBanner ? 'Banner updated successfully!' : 'Banner created successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
        setShowForm(false);
        setEditingBanner(null);
        resetForm();
        fetchBanners();
      } else {
        const errorData = await res.json();
        setSaveMessage(`Save failed: ${errorData.error || 'Unknown error'}`);
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (error) {
      console.error('Failed to save banner:', error);
      setSaveMessage('Save failed, please check network connection');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleEdit = (banner: any) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      image: banner.image || '',
      link: banner.link || '',
      button_text: banner.button_text || '',
      sort_order: banner.sort_order || 0,
      is_active: !!banner.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/content/banners/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBanners();
    } catch (error) {
      console.error('Failed to delete banner:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      link: '',
      button_text: '',
      sort_order: 0,
      is_active: true,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      setFormData({ ...formData, image: data.url });
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Banner Management</h2>
        <button
          onClick={() => {
            resetForm();
            setEditingBanner(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + Add Banner
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingBanner ? 'Edit Banner' : 'Add Banner'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="input-field"
                  placeholder="/products"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Image (Recommended: 1920 x 600 px, JPEG)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="h-20 object-cover rounded" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                  Enable
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary">
                {editingBanner ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingBanner(null);
                }}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
            {saveMessage && (
              <div className={`mt-4 p-3 rounded ${saveMessage.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {saveMessage}
              </div>
            )}
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl shadow overflow-hidden">
            {banner.image && (
              <img src={banner.image} alt={banner.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-semibold">{banner.title}</h3>
              <p className="text-sm text-gray-500">{banner.subtitle}</p>
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-sm px-2 py-1 rounded ${banner.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                >
                  {banner.is_active ? 'Enabled' : 'Disabled'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(banner)} className="text-primary-600 hover:text-primary-800">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(banner.id)} className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentManager() {
  const [content, setContent] = useState<any[]>([]);
  const [activePage, setActivePage] = useState('home');
  const [editingValues, setEditingValues] = useState<{ [key: number]: string }>({});
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // 字段标签映射
  const fieldLabels: { [key: string]: { [key: string]: string } } = {
    header: {
      logo: '网站Logo名称',
      phone: '联系电话',
      email: '联系邮箱',
    },
    about: {
      title: '标题',
      description: '描述',
      image: '图片',
    },
    features: {
      title: '标题',
      feature1_title: '特点1标题',
      feature1_desc: '特点1描述',
      feature2_title: '特点2标题',
      feature2_desc: '特点2描述',
      feature3_title: '特点3标题',
      feature3_desc: '特点3描述',
      feature4_title: '特点4标题',
      feature4_desc: '特点4描述',
    },
    cta: {
      title: '标题',
      description: '描述',
      button_text: '按钮文字',
    },
    company: {
      name: '公司名称',
      address: '公司地址',
      phone: '联系电话',
      email: '联系邮箱',
    },
    social: {
      linkedin: 'LinkedIn',
      facebook: 'Facebook',
      instagram: 'Instagram',
    },
    copyright: {
      text: '版权信息',
    },
    hero: {
      title: '标题',
      subtitle: '副标题',
    },
    intro: {
      title: '标题',
      description: '描述',
      description2: '描述2',
      image: '图片',
    },
    sustainability: {
      title: '标题',
      description: '描述',
      description2: '描述 2',
      image: '图片',
    },
    // 行业页面 - 服务行业部分
    service_intro: {
      title: '标题',
      subtitle: '副标题',
    },
    // 行业页面 - 为什么选择我们部分
    why_choose: {
      title: '标题',
      feature1_title: '特点 1 标题',
      feature1_desc: '特点 1 描述',
      feature2_title: '特点 2 标题',
      feature2_desc: '特点 2 描述',
      feature3_title: '特点 3 标题',
      feature3_desc: '特点 3 描述',
      feature4_title: '特点 4 标题',
      feature4_desc: '特点 4 描述',
    },
  };

  // 分区标题映射
  const sectionLabels: { [key: string]: string } = {
    header: '头部信息',
    about: '关于我们',
    features: '特点展示',
    cta: '行动号召',
    company: '公司信息',
    social: '社交媒体（显示在页脚联系信息下方）',
    copyright: '版权信息',
    hero: '英雄区',
    intro: '介绍区',
    sustainability: '环保页面内容',
    service_intro: '服务行业（仅文字，行业图片在下方产品列表中管理）',
    why_choose: '为什么选择我们',
  };

  const getLabel = (section: string, key: string) => {
    return fieldLabels[section]?.[key] || key;
  };

  const getSectionLabel = (section: string) => {
    return sectionLabels[section] || section;
  };

  useEffect(() => {
    fetchContent();
  }, [activePage]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/content?page=${activePage}`);
      const data = await res.json();
      setContent(data);
      // 重置编辑值为原始值
      const initialValues: { [key: number]: string } = {};
      data.forEach((item: any) => {
        initialValues[item.id] = item.value || '';
      });
      setEditingValues(initialValues);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  // 处理输入变化 - 只更新本地状态
  const handleInputChange = useCallback((itemId: number, newValue: string) => {
    setEditingValues(prev => ({ ...prev, [itemId]: newValue }));
    setHasChanges(true);
  }, []);

  // 手动保存所有修改
  const handleSaveAll = useCallback(async () => {
    const token = localStorage.getItem('token');
    setIsSaving(true);

    try {
      // 只保存有变化的内容
      const savePromises = content.map(async (item) => {
        const newValue = editingValues[item.id];
        const hasValueChanged = newValue !== (item.value || '');
        const hasImageChanged = item.newImage !== item.image;

        if (hasValueChanged || hasImageChanged) {
          const res = await fetch('/api/content', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              page: item.page,
              section: item.section,
              key: item.key,
              value: newValue,
              image: item.newImage || item.image,
            }),
          });
          return res;
        }
        return null;
      });

      const results = await Promise.all(savePromises);

      // 检查是否有保存失败的情况
      const hasFailures = results.some(res => res && !res.ok);

      if (hasFailures) {
        setSaveMessage('部分内容保存失败，请重试');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('所有内容保存成功！');
        setTimeout(() => setSaveMessage(null), 3000);
        setHasChanges(false);
        // 清除 newImage 标记
        setContent(prev => prev.map(item => ({ ...item, newImage: undefined })));
        // 重新获取内容以显示最新值
        fetchContent();
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      setSaveMessage('保存失败，请检查网络连接');
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  }, [content, editingValues]);

  // 处理图片上传
  const handleImageUpload = async (item: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      // 标记有新图片，在保存时使用
      setContent(prev => prev.map(i =>
        i.id === item.id ? { ...i, newImage: data.url } : i
      ));
      setHasChanges(true);
    } catch (error) {
      console.error('Failed to upload image:', error);
      setSaveMessage('Image upload failed, please try again');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const groupedContent = content.reduce((acc: any, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Website Content Management</h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => {
            if (hasChanges) {
              if (confirm('You have unsaved changes. Switching pages will lose these changes. Are you sure you want to continue?')) {
                setActivePage('home');
              }
            } else {
              setActivePage('home');
            }
          }}
          className={`px-4 py-2 rounded-lg ${activePage === 'home' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Home
        </button>
        <button
          onClick={() => {
            if (hasChanges) {
              if (confirm('You have unsaved changes. Switching pages will lose these changes. Are you sure you want to continue?')) {
                setActivePage('about');
              }
            } else {
              setActivePage('about');
            }
          }}
          className={`px-4 py-2 rounded-lg ${activePage === 'about' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
        >
          About Us
        </button>
        <button
          onClick={() => {
            if (hasChanges) {
              if (confirm('You have unsaved changes. Switching pages will lose these changes. Are you sure you want to continue?')) {
                setActivePage('contact');
              }
            } else {
              setActivePage('contact');
            }
          }}
          className={`px-4 py-2 rounded-lg ${activePage === 'contact' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Contact Us
        </button>
        <button
          onClick={() => {
            if (hasChanges) {
              if (confirm('You have unsaved changes. Switching pages will lose these changes. Are you sure you want to continue?')) {
                setActivePage('industries');
              }
            } else {
              setActivePage('industries');
            }
          }}
          className={`px-4 py-2 rounded-lg ${activePage === 'industries' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Industries
        </button>
        <button
          onClick={() => {
            if (hasChanges) {
              if (confirm('You have unsaved changes. Switching pages will lose these changes. Are you sure you want to continue?')) {
                setActivePage('sustainability');
              }
            } else {
              setActivePage('sustainability');
            }
          }}
          className={`px-4 py-2 rounded-lg ${activePage === 'sustainability' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Sustainability
        </button>
        <button
          onClick={() => {
            if (hasChanges) {
              if (confirm('You have unsaved changes. Switching pages will lose these changes. Are you sure you want to continue?')) {
                setActivePage('footer');
              }
            } else {
              setActivePage('footer');
            }
          }}
          className={`px-4 py-2 rounded-lg ${activePage === 'footer' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
        >
          Footer
        </button>
      </div>

      {saveMessage && (
        <div className={`mb-6 p-4 rounded-lg ${saveMessage.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {saveMessage}
        </div>
      )}

      <div className="mb-6 flex gap-4">
        <button
          onClick={handleSaveAll}
          disabled={!hasChanges || isSaving}
          className={`px-6 py-3 rounded-lg font-medium ${hasChanges && !isSaving
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
        {hasChanges && (
          <span className="text-orange-600 font-medium">You have unsaved changes</span>
        )}
      </div>

      {Object.entries(groupedContent).map(([section, items]: [string, any]) => (
        <div key={section} className="bg-white rounded-xl p-6 shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">{getSectionLabel(section)}</h3>
          <div className="space-y-4">
            {(items as any[]).map((item) => (
              <div key={item.id} className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{getLabel(item.section, item.key)}</label>
                </div>
                <div className="col-span-2">
                  {item.key.includes('image') ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(item, e)}
                        className="flex-1"
                      />
                      {item.newImage || item.image ? (
                        <img src={item.newImage || item.image} alt="Preview" className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                      {(item.newImage || item.image) && (
                        <span className="text-xs text-green-600">
                          {item.newImage ? 'New Image' : 'Current Image'}
                        </span>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={editingValues[item.id] || ''}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      className="input-field w-full"
                      placeholder={`Please enter ${getLabel(item.section, item.key)}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
