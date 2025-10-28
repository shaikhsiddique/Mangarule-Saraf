import Head from 'next/head';
import { useState } from 'react';

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Failed to send');
      setStatus('Thanks for your feedback! We will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-ms-cream min-h-screen">
      <Head>
        <title>Feedback - Mangarule Saraf</title>
      </Head>
      <div className="max-w-xl mx-auto py-12 px-4">
        <h1 className="section-heading text-center">Feedback</h1>
        <div className="section-divider mx-auto mb-6" />
        {status && (
          <div className="mb-4 text-sm text-center px-4 py-2 rounded border border-ms-gold bg-white">
            {status}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-ms-card p-6 space-y-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="w-full border border-ms-gold-light rounded px-3 py-2" required />
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your Email" className="w-full border border-ms-gold-light rounded px-3 py-2" required />
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your Message" className="w-full border border-ms-gold-light rounded px-3 py-2 h-32 resize-vertical" required />
          <button disabled={loading} className="w-full bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light py-2 rounded-lg font-heading disabled:opacity-60">{loading ? 'Sending...' : 'Send Feedback'}</button>
        </form>
      </div>
    </div>
  );
}


