import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Registration failed');
      }
      const data = await res.json();
      login(data.token, data.user);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="bg-ms-cream min-h-screen">
      <Head>
        <title>Sign Up - Mangarule Saraf</title>
      </Head>
      <div className="max-w-md mx-auto py-12 px-4">
        <h1 className="section-heading text-center">Create Account</h1>
        <div className="section-divider mx-auto mb-6" />
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-ms-card p-6 space-y-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full border border-ms-gold-light rounded px-3 py-2" required />
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-ms-gold-light rounded px-3 py-2" required />
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full border border-ms-gold-light rounded px-3 py-2" required />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="w-full border border-ms-gold-light rounded px-3 py-2" required />
          <button disabled={loading} className="w-full bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light py-2 rounded-lg font-heading disabled:opacity-60">{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
}
