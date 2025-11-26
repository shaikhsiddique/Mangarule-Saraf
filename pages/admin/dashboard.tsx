import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Head from 'next/head';

interface Stats {
  totalProducts: number;
  totalUsers: number;
  totalStock: number;
  activeOrders: number;
}

interface Order {
  _id: string;
  user: { name: string; email: string };
  items: Array<{
    id: string;
    name: string;
    price: string;
    quantity: number;
  }>;
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/');
      return;
    }
    fetchStats();
  }, [user, loading, router]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const [productsRes, usersRes, ordersRes] = await Promise.all([
        fetch('/api/admin/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('/api/admin/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      if (productsRes.ok && usersRes.ok && ordersRes.ok) {
        const products = await productsRes.json();
        const users = await usersRes.json();
        const ordersData = await ordersRes.json();
        const totalStock = products.reduce((sum: number, p: any) => sum + p.stock, 0);

        setStats({
          totalProducts: products.length,
          totalUsers: users.length,
          totalStock,
          activeOrders: ordersData.length
        });
        setOrders(ordersData);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };


  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Admin Dashboard - Mangarule Saraf</title>
      </Head>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="text-3xl font-bold text-ms-gold">{stats?.totalProducts || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-ms-gold">{stats?.totalUsers || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Stock</h3>
            <p className="text-3xl font-bold text-ms-gold">{stats?.totalStock || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Active Orders</h3>
            <p className="text-3xl font-bold text-ms-gold">{stats?.activeOrders || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/admin/products')}
              className="bg-ms-gold text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Manage Products
            </button>
            <button
              onClick={() => router.push('/admin/users')}
              className="bg-ms-gold text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              View Users
            </button>
          </div>
        </div>

        {/* Active Orders Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">No active orders found.</p>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Order ID</h3>
                      <p className="text-gray-600">{order._id}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Date</h3>
                      <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Customer</h3>
                      <p className="text-gray-600">{order.user.name}</p>
                      <p className="text-gray-500 text-sm">{order.user.email}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Status</h3>
                      <p className="text-gray-600">{order.status}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-800">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Total:</span>
                      <span className="text-xl font-bold text-ms-gold">₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
