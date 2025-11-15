import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Head from 'next/head';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: string;
  type: string;
  stock: number;
  description: string;
  isActive: boolean;
  tags: string[];
}

export default function AdminProducts() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    type: 'mangalsutra',
    stock: 0,
    description: '',
    tags: ''
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/');
      return;
    }
    fetchProducts();
  }, [user, loading, router]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const productData = { ...formData, tags };

      const url = editingProduct ? '/api/admin/products' : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const body = editingProduct ? { id: editingProduct._id, ...productData } : productData;

      const token = localStorage.getItem('auth_token');
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });


      if (res.ok) {
        fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };


  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      price: '',
      type: 'mangalsutra',
      stock: 0,
      description: '',
      tags: ''
    });
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      image: product.image,
      price: product.price,
      type: product.type,
      stock: product.stock,
      description: product.description,
      tags: product.tags.join(', ')
    });
    setShowForm(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Product Management - Admin</title>
      </Head>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setEditingProduct(null);
                resetForm();
              }
            }}
            className="bg-ms-gold text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Price (e.g., ₹1,999)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="border rounded px-3 py-2"
              >
                <option value="mangalsutra">Mangalsutra</option>
                <option value="bracelets">Bracelets</option>
                <option value="earrings">Earrings</option>
                <option value="necklaces">Necklaces</option>
                <option value="party-wear">Party Wear</option>
                <option value="rings">Rings</option>
                <option value="daily-wear">Daily Wear</option>
              </select>
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="border rounded px-3 py-2"
                min="0"
                required
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border rounded px-3 py-2 md:col-span-2"
                rows={3}
              />
              <button
                type="submit"
                className="bg-ms-gold text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors md:col-span-2"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">All Products ({products.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded mr-3" />
                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
