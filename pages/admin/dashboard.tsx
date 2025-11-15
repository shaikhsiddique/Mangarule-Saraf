import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Head from 'next/head';

interface Stats {
  totalProducts: number;
  totalUsers: number;
  totalStock: number;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

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
      const [productsRes, usersRes] = await Promise.all([
        fetch('/api/admin/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      if (productsRes.ok && usersRes.ok) {
        const products = await productsRes.json();
        const users = await usersRes.json();
        const totalStock = products.reduce((sum: number, p: any) => sum + p.stock, 0);

        setStats({
          totalProducts: products.length,
          totalUsers: users.length,
          totalStock
        });
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
      </div>
    </div>
  );
}
