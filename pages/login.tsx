import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Login failed');
      }
      const data = await res.json();
      login(data.token, data.user);

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-ms-cream min-h-screen">
      <Head>
        <title>User Login - Mangarule Saraf</title>
      </Head>
      <div className="max-w-md mx-auto py-12 px-4">
        <h1 className="section-heading text-center">User Login</h1>
        <div className="section-divider mx-auto mb-6" />
        <p className="text-center text-ms-dark mb-6">Sign in to your account to access your cart and place orders.</p>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-ms-card p-6 space-y-4">
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-ms-gold-light rounded px-3 py-2" required />
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full border border-ms-gold-light rounded px-3 py-2" required />
          <button disabled={loading} className="w-full bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light py-2 rounded-lg font-heading disabled:opacity-60">{loading ? 'Signing in...' : 'Login'}</button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-ms-dark">
            Don't have an account?{' '}
            <Link href="/signup" className="text-ms-gold hover:text-ms-dark font-medium">
              Sign up here
            </Link>
          </p>
          <p className="text-sm text-ms-dark mt-2">
            Are you an admin?{' '}
            <Link href="/admin/login" className="text-red-600 hover:text-red-800 font-medium">
              Admin Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
